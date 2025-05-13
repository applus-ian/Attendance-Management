"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from 'lucide-react';
import { Clock } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

interface ManualRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: {
        requestType: string;
        startTime: string;
        endTime: string;
        date: string;
        comment: string;
    }) => void;
}

export default function ManualRequestModal({
    isOpen,
    onClose,
    onSubmit
}: ManualRequestModalProps) {
    const [formData, setFormData] = useState({
        requestType: '',
        startTime: '06 : 30 : AM',
        endTime: '06 : 30 : PM',
        date: 'April 08, 2025',
        comment: ''
    });
    
    // State for dropdowns
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    
    // Create refs for the containers
    const startTimeContainerRef = useRef<HTMLDivElement>(null);
    const endTimeContainerRef = useRef<HTMLDivElement>(null);
    const dateContainerRef = useRef<HTMLDivElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (startTimeContainerRef.current && !startTimeContainerRef.current.contains(event.target as Node)) {
                setShowStartTimePicker(false);
            }
            if (endTimeContainerRef.current && !endTimeContainerRef.current.contains(event.target as Node)) {
                setShowEndTimePicker(false);
            }
            if (dateContainerRef.current && !dateContainerRef.current.contains(event.target as Node)) {
                setShowDatePicker(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Generate hours and minutes for time picker
    const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
    const ampm = ['AM', 'PM'];

    // Set initial values for date input
    useEffect(() => {
        if (isOpen && dateRef.current) {
            dateRef.current.value = "2025-04-08";
        }
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle time selection for Start Time
    const handleStartTimeSelect = (hour: string, minute: string, period: string) => {
        const formattedTime = `${hour} : ${minute} : ${period}`;
        setFormData(prev => ({
            ...prev,
            startTime: formattedTime
        }));
        setShowStartTimePicker(false);
    };

    // Handle time selection for End Time
    const handleEndTimeSelect = (hour: string, minute: string, period: string) => {
        const formattedTime = `${hour} : ${minute} : ${period}`;
        setFormData(prev => ({
            ...prev,
            endTime: formattedTime
        }));
        setShowEndTimePicker(false);
    };

    // Handle date input for Date field
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            // Format the date as "April 08, 2025"
            const date = new Date(e.target.value);
            const options: Intl.DateTimeFormatOptions = { 
                year: 'numeric', 
                month: 'long', 
                day: '2-digit'
            };
            const formattedDate = date.toLocaleDateString('en-US', options);
            
            setFormData(prev => ({
                ...prev,
                date: formattedDate
            }));
            setShowDatePicker(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            requestType: '',
            startTime: '06 : 30 : AM',
            endTime: '06 : 30 : PM',
            date: 'April 08, 2025',
            comment: ''
        });
        onClose();
    };

    if (!isOpen) return null;

    // Parse the current time values
    const parseTimeValue = (timeString: string) => {
        const parts = timeString.split(' : ');
        return {
            hour: parts[0],
            minute: parts[1],
            period: parts[2]
        };
    };

    const startTimeParsed = parseTimeValue(formData.startTime);
    const endTimeParsed = parseTimeValue(formData.endTime);

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-xl relative">
                <div className="p-6">
                    {/* Header */}
                    <h2 className="text-xl font-medium mb-2">Manual Request</h2>
                    
                    {/* Divider */}
                    <div className="border-t border-gray-200 mb-5"></div>
                    
                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        {/* Request Type */}
                        <div className="mb-5">
                            <label className="block text-sm font-medium mb-2">
                                Request Type <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    name="requestType"
                                    value={formData.requestType}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm appearance-none h-11"
                                >
                                    <option value="" disabled>Select Type . . . .</option>
                                    <option value="clock-in">Clock In</option>
                                    <option value="clock-out">Clock Out</option>
                                    <option value="leave">Leave Request</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <ChevronDown className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>
                        
                        {/* Date and Time Row */}
                        <div className="grid grid-cols-3 gap-4 mb-5">
                            {/* Start Time */}
                            <div ref={startTimeContainerRef} className="relative">
                                <label className="block text-sm font-medium mb-2">
                                    Start Time <span className="text-red-500">*</span>
                                </label>
                                <div className="flex">
                                    <input
                                        type="text"
                                        name="startTime"
                                        value={formData.startTime}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 rounded-l-md px-3 py-2 text-sm h-11"
                                        readOnly
                                    />
                                    <button
                                        type="button"
                                        className="bg-gray-50 border border-l-0 border-gray-300 rounded-r-md px-3 flex items-center justify-center"
                                        onClick={() => setShowStartTimePicker(!showStartTimePicker)}
                                    >
                                        <Clock className="h-5 w-5 text-gray-400" />
                                    </button>
                                </div>
                                
                                {/* Custom Time Picker for Start Time */}
                                {showStartTimePicker && (
                                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 flex">
                                        {/* Hours */}
                                        <div className="w-16 max-h-48 overflow-y-auto py-1 border-r border-gray-200">
                                            {hours.map(hour => (
                                                <div 
                                                    key={hour}
                                                    className={`px-2 py-1 cursor-pointer hover:bg-gray-100 text-center ${startTimeParsed.hour === hour ? 'bg-gray-100 font-semibold' : ''}`}
                                                    onClick={() => handleStartTimeSelect(hour, startTimeParsed.minute, startTimeParsed.period)}
                                                >
                                                    {hour}
                                                </div>
                                            ))}
                                        </div>
                                        
                                        {/* Minutes */}
                                        <div className="w-16 max-h-48 overflow-y-auto py-1 border-r border-gray-200">
                                            {minutes.map(minute => (
                                                <div 
                                                    key={minute}
                                                    className={`px-2 py-1 cursor-pointer hover:bg-gray-100 text-center ${startTimeParsed.minute === minute ? 'bg-gray-100 font-semibold' : ''}`}
                                                    onClick={() => handleStartTimeSelect(startTimeParsed.hour, minute, startTimeParsed.period)}
                                                >
                                                    {minute}
                                                </div>
                                            ))}
                                        </div>
                                        
                                        {/* AM/PM */}
                                        <div className="w-16 py-1">
                                            {ampm.map(period => (
                                                <div 
                                                    key={period}
                                                    className={`px-2 py-1 cursor-pointer hover:bg-gray-100 text-center ${startTimeParsed.period === period ? 'bg-gray-100 font-semibold' : ''}`}
                                                    onClick={() => handleStartTimeSelect(startTimeParsed.hour, startTimeParsed.minute, period)}
                                                >
                                                    {period}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* End Time */}
                            <div ref={endTimeContainerRef} className="relative">
                                <label className="block text-sm font-medium mb-2">
                                    End Time <span className="text-red-500">*</span>
                                </label>
                                <div className="flex">
                                    <input
                                        type="text"
                                        name="endTime"
                                        value={formData.endTime}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 rounded-l-md px-3 py-2 text-sm h-11"
                                        readOnly
                                    />
                                    <button
                                        type="button"
                                        className="bg-gray-50 border border-l-0 border-gray-300 rounded-r-md px-3 flex items-center justify-center"
                                        onClick={() => setShowEndTimePicker(!showEndTimePicker)}
                                    >
                                        <Clock className="h-5 w-5 text-gray-400" />
                                    </button>
                                </div>
                                
                                {/* Custom Time Picker for End Time */}
                                {showEndTimePicker && (
                                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 flex">
                                        {/* Hours */}
                                        <div className="w-16 max-h-48 overflow-y-auto py-1 border-r border-gray-200">
                                            {hours.map(hour => (
                                                <div 
                                                    key={hour}
                                                    className={`px-2 py-1 cursor-pointer hover:bg-gray-100 text-center ${endTimeParsed.hour === hour ? 'bg-gray-100 font-semibold' : ''}`}
                                                    onClick={() => handleEndTimeSelect(hour, endTimeParsed.minute, endTimeParsed.period)}
                                                >
                                                    {hour}
                                                </div>
                                            ))}
                                        </div>
                                        
                                        {/* Minutes */}
                                        <div className="w-16 max-h-48 overflow-y-auto py-1 border-r border-gray-200">
                                            {minutes.map(minute => (
                                                <div 
                                                    key={minute}
                                                    className={`px-2 py-1 cursor-pointer hover:bg-gray-100 text-center ${endTimeParsed.minute === minute ? 'bg-gray-100 font-semibold' : ''}`}
                                                    onClick={() => handleEndTimeSelect(endTimeParsed.hour, minute, endTimeParsed.period)}
                                                >
                                                    {minute}
                                                </div>
                                            ))}
                                        </div>
                                        
                                        {/* AM/PM */}
                                        <div className="w-16 py-1">
                                            {ampm.map(period => (
                                                <div 
                                                    key={period}
                                                    className={`px-2 py-1 cursor-pointer hover:bg-gray-100 text-center ${endTimeParsed.period === period ? 'bg-gray-100 font-semibold' : ''}`}
                                                    onClick={() => handleEndTimeSelect(endTimeParsed.hour, endTimeParsed.minute, period)}
                                                >
                                                    {period}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Date */}
                            <div ref={dateContainerRef} className="relative">
                                <label className="block text-sm font-medium mb-2">
                                    Date <span className="text-red-500">*</span>
                                </label>
                                <div className="flex">
                                    <input
                                        type="text"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 rounded-l-md px-3 py-2 text-sm h-11"
                                        readOnly
                                    />
                                    <button
                                        type="button"
                                        className="bg-gray-50 border border-l-0 border-gray-300 rounded-r-md px-3 flex items-center justify-center"
                                        onClick={() => setShowDatePicker(!showDatePicker)}
                                    >
                                        <Calendar className="h-5 w-5 text-gray-400" />
                                    </button>
                                </div>
                                
                                {/* Date Picker Dropdown */}
                                {showDatePicker && (
                                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 p-2">
                                        <input
                                            ref={dateRef}
                                            type="date"
                                            className="border border-gray-300 rounded-md p-2"
                                            onChange={handleDateChange}
                                            defaultValue="2025-04-08"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Comment */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">
                                Comment <span className="text-red-500">*</span>
                            </label>
                            <Textarea
                                name="comment"
                                value={formData.comment}
                                onChange={handleChange}
                                required
                                className="resize-none min-h-[120px] w-full border-gray-300 rounded-md"
                            />
                        </div>
                        
                        {/* Actions */}
                        <div className="flex justify-end gap-3">
                            <Button 
                                type="button"
                                onClick={onClose} 
                                variant="outline"
                                className="rounded-md px-5 py-2 h-auto border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit"
                                className="bg-[#FF7A45] hover:bg-[#F05E21] text-white border-0 rounded-md px-5 py-2 h-auto"
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
