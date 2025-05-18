"use client"

import { useState, FC } from "react"
import { Button } from "@/components/ui/button"
import RequestDetailsModal from "../admin-form-modal/page"
import ApprovalModal from "../approval-modal/page"
import RejectModal from "../reject-modal/page"

interface RequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    requestData: {
        dateSubmitted: string;
        name: string;
        requestType: string;
        dateRequested: string;
        comment: string;
    };
}

const RequestModal: FC<RequestModalProps> = ({ isOpen, onClose, requestData }) => {
    const [showApprovalModal, setShowApprovalModal] = useState(false)
    const [showRejectModal, setShowRejectModal] = useState(false)

    if (!isOpen) return null;

    const handleApprove = () => {
        setShowApprovalModal(true)
    }

    const handleReject = () => {
        setShowRejectModal(true)
    }

    const handleApproveConfirm = (feedback: string) => {
        alert(`Request approved with feedback: ${feedback}`)
        setShowApprovalModal(false)
        onClose()
    }

    const handleRejectConfirm = (feedback: string) => {
        alert(`Request rejected with feedback: ${feedback}`)
        setShowRejectModal(false)
        onClose()
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <RequestDetailsModal
                isOpen={isOpen}
                onClose={onClose}
                onApprove={handleApprove}
                onReject={handleReject}
                requestData={requestData}
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

export default RequestModal
