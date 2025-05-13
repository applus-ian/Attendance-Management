"use client"

import React, { useState } from 'react';
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Modal, Form } from 'react-bootstrap'

interface ClockInModalProps {
    show: boolean;
    onHide: () => void;
    onClockIn: (comment: string) => void;
    currentTime: string;
    shiftTime: string;
}

export default function ClockInModal({
    show,
    onHide,
    onClockIn,
    currentTime,
    shiftTime
}: ClockInModalProps) {
    const [comment, setComment] = useState<string>('');

    const handleClockIn = () => {
        onClockIn(comment);
        setComment('');
        onHide();
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" 
             style={{display: show ? 'flex' : 'none'}}>
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">
                <div className="p-5">
                    {/* Header */}
                    <h2 className="text-lg font-normal">Clock in at {currentTime}</h2>
                    
                    {/* Divider */}
                    <div className="border-t border-gray-200 my-3"></div>
                    
                    {/* Shift info */}
                    <p className="text-sm text-gray-600 mb-4">Your shift starts at {shiftTime}</p>
                    
                    {/* Comment section */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Comment</label>
                        <Textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="resize-none min-h-[120px] w-full border-gray-300"
                        />
                    </div>
                    
                    {/* Actions */}
                    <div className="flex justify-end gap-2 mt-6">
                        <Button 
                            onClick={onHide} 
                            variant="outline"
                            className="rounded-md px-4"
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleClockIn} 
                            className="bg-[#FF7A45] hover:bg-[#F05E21] text-white border-0 rounded-md px-4"
                        >
                            Clock In
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
} 