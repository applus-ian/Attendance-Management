"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ManualRequestModal from "./manual-clock-in"

export default function ManualRequestButton() {
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (formData: {
        requestType: string;
        startTime: string;
        endTime: string;
        date: string;
        comment: string;
    }) => {
        console.log('Form submitted:', formData);
        // Here you would typically send the data to your API
        alert(`Request submitted!\nType: ${formData.requestType}\nStart Time: ${formData.startTime}\nEnd Time: ${formData.endTime}\nDate: ${formData.date}\nComment: ${formData.comment}`);
    };

    return (
        <div>
            {/* Manual Request Button */}
            <Button
                onClick={() => setShowModal(true)}
                className="bg-[#292929] hover:bg-[#3a3a3a] text-white rounded-3xl px-5 py-2"
            >
                Manual Request
            </Button>

            {/* Manual Request Modal */}
            <ManualRequestModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleSubmit}
            />
        </div>
    );
} 