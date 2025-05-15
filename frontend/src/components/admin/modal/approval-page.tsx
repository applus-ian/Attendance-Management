"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ApprovalModal from "./approval-modal/page"

export default function ApprovePage() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleContinue = (feedback: string) => {
        console.log("Request approved with feedback:", feedback)
        setIsModalOpen(false)
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Button onClick={() => setIsModalOpen(true)}>Open Approval Modal</Button>

            <ApprovalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onContinue={handleContinue} isReject={false} />
        </div>
    )
}