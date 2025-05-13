"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ClockOutModal from "./clock-out-modal"

interface ClockOutButtonProps {
    className?: string;
    timeWorked?: string;
    clockOutTime?: string;
}

export default function ClockOutButton({ 
    className, 
    timeWorked = "8 hrs and 46 minutes", 
    clockOutTime = "5:57 a.m" 
}: ClockOutButtonProps) {
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (comment: string) => {
        console.log('Clock out submitted with comment:', comment);
        // Here you would typically send the data to your API
        alert(`Clock Out successful!\nTime worked: ${timeWorked}\nComment: ${comment || 'No comment provided'}`);
    };

    return (
        <div>
            {/* Clock Out Button */}
            <Button
                onClick={() => setShowModal(true)}
                className={`bg-[#FF7A45] hover:bg-[#F05E21] text-white rounded-md px-5 py-2 ${className || ''}`}
            >
                Clock Out
            </Button>

            {/* Clock Out Modal */}
            <ClockOutModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleSubmit}
                timeWorked={timeWorked}
                clockOutTime={clockOutTime}
            />
        </div>
    );
} 