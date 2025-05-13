"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface ClockOutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (comment: string) => void;
    timeWorked: string;
    clockOutTime: string;
}

export default function ClockOutModal({
    isOpen,
    onClose,
    onSubmit,
    timeWorked = "8 hrs and 46 minutes",
    clockOutTime = "5:57 a.m"
}: ClockOutModalProps) {
    const [comment, setComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(comment);
        setComment('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-xl relative">
                <div className="p-6">
                    {/* Header */}
                    <h2 className="text-xl font-medium mb-2">Clock Out at {clockOutTime}</h2>
                    
                    {/* Divider */}
                    <div className="border-t border-gray-200 my-4"></div>
                    
                    {/* Time worked information */}
                    <p className="text-base my-6">
                        You have work a total {timeWorked}.
                    </p>
                    
                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        {/* Comment */}
                        <div className="mb-6">
                            <label className="block text-base font-medium mb-2">
                                Comment
                            </label>
                            <Textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
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
                                Clock Out
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 