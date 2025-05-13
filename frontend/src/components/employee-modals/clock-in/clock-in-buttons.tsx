"use client"

import { useState } from "react"
import { Button } from "react-bootstrap"
import ClockInModal from "./clock-in-modal"

export default function ClockInButtons() {
    const [showClockInModal, setShowClockInModal] = useState(false);

    const handleClockIn = (comment: string) => {
        console.log('Clock in comment:', comment);
        // Add your clock in logic here
    };

    const getCurrentTime = () => {
        return new Date().toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <div className="p-4">
            {/* Clock In Button */}
            <Button
                onClick={() => setShowClockInModal(true)}
                style={{
                    backgroundColor: '#292929',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '10px 24px',
                    fontWeight: '500',
                    fontSize: '16px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
            >
                Clock In
            </Button>

            {/* Clock In Modal */}
            <ClockInModal
                show={showClockInModal}
                onHide={() => setShowClockInModal(false)}
                onClockIn={handleClockIn}
                currentTime={getCurrentTime()}
                shiftTime="6 a.m - 3 p.m"
            />
        </div>
    )
}