"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import RequestDetailsModal from "../admin-form-modal/page"
import ApprovalModal from "../approval-modal/page"
import RejectModal from "../reject-modal/page"

export default function RequestModal() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showApprovalModal, setShowApprovalModal] = useState(false)
    const [showRejectModal, setShowRejectModal] = useState(false)

    const sampleRequestData = {
        dateSubmitted: "January 23, 2023",
        name: "Shiela Marie Arcillo",
        requestType: "Clock In Request",
        dateRequested: "January 23, 2023",
        comment: "Forgot to clock in",
    }

    const handleApprove = () => {
        setShowApprovalModal(true)
    }

    const handleReject = () => {
        setShowRejectModal(true)
    }

    const handleApproveConfirm = (feedback: string) => {
        alert(`Request approved with feedback: ${feedback}`)
        setShowApprovalModal(false)
        setIsModalOpen(false)
    }

    const handleRejectConfirm = (feedback: string) => {
        alert(`Request rejected with feedback: ${feedback}`)
        setShowRejectModal(false)
        setIsModalOpen(false)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <Button onClick={() => setIsModalOpen(true)}>Open Request Details</Button>

            <RequestDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onApprove={handleApprove}
                onReject={handleReject}
                requestData={sampleRequestData}
            />

            <ApprovalModal
                isOpen={showApprovalModal}
                onClose={() => setShowApprovalModal(false)}
                onContinue={handleApproveConfirm}
                isReject={false}
            />

            <RejectModal
                isOpen={showRejectModal}
                onClose={() => setShowRejectModal(false)}
                onContinue={handleRejectConfirm}
            />
        </div>
    )
}
