"use client"

import { X, Calendar, User, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface RequestDetailsModalProps {
    isOpen: boolean
    onClose: () => void
    onApprove: () => void
    onReject: () => void
    requestData: {
        dateSubmitted: string
        name: string
        requestType: string
        dateRequested: string
        comment: string
    }
}

export default function RequestDetailsModal({
    isOpen,
    onClose,
    onApprove,
    onReject,
    requestData,
}: RequestDetailsModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">
                {/* Header with close button */}
                <div className="flex justify-between items-center p-5 pb-4">
                    <h2 className="text-xl font-bold">Request Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Form content */}
                <div className="px-5 pb-5">
                    {/* Date Submitted */}
                    <div className="flex items-start mb-4">
                        <div className="w-1/3 pt-2">
                            <label className="block text-sm font-medium">Date Submitted</label>
                        </div>
                        <div className="w-2/3">
                            <div className="flex items-center border rounded-md px-3 py-2">
                                <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                                <span className="text-sm">{requestData.dateSubmitted}</span>
                            </div>
                        </div>
                    </div>

                    {/* Name */}
                    <div className="flex items-start mb-4">
                        <div className="w-1/3 pt-2">
                            <label className="block text-sm font-medium">Name</label>
                        </div>
                        <div className="w-2/3">
                            <div className="flex items-center border rounded-md px-3 py-2">
                                <User className="h-4 w-4 text-gray-500 mr-2" />
                                <span className="text-sm">{requestData.name}</span>
                            </div>
                        </div>
                    </div>

                    {/* Request Type */}
                    <div className="flex items-start mb-4">
                        <div className="w-1/3 pt-2">
                            <label className="block text-sm font-medium">Request Type</label>
                        </div>
                        <div className="w-2/3">
                            <div className="flex items-center border rounded-md px-3 py-2">
                                <Clock className="h-4 w-4 text-gray-500 mr-2" />
                                <span className="text-sm">{requestData.requestType}</span>
                            </div>
                        </div>
                    </div>

                    {/* Date Requested */}
                    <div className="flex items-start mb-4">
                        <div className="w-1/3 pt-2">
                            <label className="block text-sm font-medium">Date Requested</label>
                        </div>
                        <div className="w-2/3">
                            <div className="flex items-center border rounded-md px-3 py-2">
                                <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                                <span className="text-sm">{requestData.dateRequested}</span>
                            </div>
                        </div>
                    </div>

                    {/* Comment */}
                    <div className="flex items-start mb-4">
                        <div className="w-1/3 pt-2">
                            <label className="block text-sm font-medium">Comment</label>
                        </div>
                        <div className="w-2/3">
                            <Textarea value={requestData.comment} readOnly className="resize-none h-24 text-sm" />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2 mt-6">
                        <Button onClick={onReject} className="bg-red-500 hover:bg-red-600 text-white rounded-full px-6">
                            Reject
                        </Button>
                        <Button onClick={onApprove} className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6">
                            Approve
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}