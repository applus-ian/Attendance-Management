"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ManualRequest } from "@/hooks/useManualRequest"
import { useState } from "react"

interface RequestDetailsModalProps {
  request: ManualRequest;
  isOpen: boolean;
  onClose: () => void;
  onApprove?: () => void;
  onReject?: () => void;
}

export function RequestDetailsModal({ request, isOpen, onClose, onApprove, onReject }: RequestDetailsModalProps) {
  const [error, setError] = useState("")
  if (!isOpen) return null;

  let timeData: { date?: string; start?: string; end?: string } = {};
  let isISODate = false;
  if (typeof request.time === 'string') {
    // Try to detect if it's a JSON string
    if (request.time.trim().startsWith('{') && request.time.trim().endsWith('}')) {
      try {
        timeData = JSON.parse(request.time);
      } catch {
        timeData = { date: request.time };
      }
    } else if (!isNaN(Date.parse(request.time))) {
      // If it's a valid ISO date or timestamp
      isISODate = true;
      timeData = { date: request.time };
    } else {
      // Fallback: treat as plain string
      timeData = { date: request.time };
    }
  } else if (typeof request.time === 'object' && request.time !== null) {
    timeData = request.time;
  }

  const hasValidId = !!request.request_id;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6 space-y-6">
        <DialogHeader>
          <DialogTitle>Request Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Request ID</label>
            <p className="mt-1">{request.request_id || '-'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Member</label>
            <p className="mt-1">{request.employee ? `${request.employee.first_name} ${request.employee.last_name}` : `Employee ${request.emp_id}`}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Request Type</label>
            <p className="mt-1 capitalize">{request.request_type.replace('_', ' ')}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Date Requested</label>
            <p className="mt-1">{timeData.date ? (isISODate ? new Date(timeData.date).toLocaleDateString() : timeData.date) : '-'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Time</label>
            <p className="mt-1">
              {timeData.start && `Start: ${timeData.start}`} {timeData.end && ` End: ${timeData.end}`}
              {!timeData.start && !timeData.end && timeData.date && !isISODate && timeData.date}
              {!timeData.start && !timeData.end && isISODate && timeData.date && new Date(timeData.date).toLocaleTimeString()}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Comment</label>
            <p className="mt-1">{request.reason}</p>
          </div>
          <div className="flex items-center mb-8">
            <label className="text-sm font-medium text-gray-500 mr-2">Status</label>
            <span className={`inline-block px-3 py-1 rounded-md text-sm font-semibold
              ${request.approval_status === 'approved' ? 'bg-green-100 text-green-700' :
                request.approval_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-700'}`}
            >
              {request.approval_status.charAt(0).toUpperCase() + request.approval_status.slice(1)}
            </span>
          </div>
        </div>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <div className="mt-6 flex justify-end gap-2">
          {/* Only show Approve/Reject if status is pending */}
          {request.approval_status === "pending" && onReject && (
            <Button
              variant="destructive"
              onClick={() => {
                if (!hasValidId) {
                  setError("Request ID is missing. Cannot reject this request.");
                  return;
                }
                setError("");
                onReject();
              }}
              disabled={!hasValidId}
              title={!hasValidId ? "Request ID is missing" : undefined}
            >
              Reject
            </Button>
          )}
          {request.approval_status === "pending" && onApprove && (
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => {
                if (!hasValidId) {
                  setError("Request ID is missing. Cannot approve this request.");
                  return;
                }
                setError("");
                onApprove();
              }}
              disabled={!hasValidId}
              title={!hasValidId ? "Request ID is missing" : undefined}
            >
              Approve
            </Button>
          )}
          {/* If approved, show disabled Approve button */}
          {request.approval_status === "approved" && (
            <Button className="bg-green-600" disabled>Approved</Button>
          )}
          {/* If rejected, show disabled Reject button */}
          {request.approval_status === "rejected" && (
            <Button variant="destructive" disabled>Rejected</Button>
          )}
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}