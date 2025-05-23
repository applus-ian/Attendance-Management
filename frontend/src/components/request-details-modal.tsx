"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Request } from "@/components/request-table"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface RequestDetailsModalProps {
  request: ManualRequest;
  isOpen: boolean;
  onClose: () => void;
}

export function RequestDetailsModal({ request, isOpen, onClose }: RequestDetailsModalProps) {
  if (!isOpen) return null;

  const timeData = JSON.parse(request.time);

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Request Details</h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Member</label>
              <p className="mt-1">{request.employee?.name || `Employee ${request.emp_id}`}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Request Type</label>
              <p className="mt-1 capitalize">{request.request_type.replace('_', ' ')}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Date Requested</label>
              <p className="mt-1">{new Date(timeData.date).toLocaleDateString()}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Time</label>
              <p className="mt-1">
                {timeData.start && `Start: ${timeData.start}`}
                {timeData.end && ` End: ${timeData.end}`}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Comment</label>
              <p className="mt-1">{request.reason}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Status</label>
              <Badge
                variant={
                  request.approval_status === "approved" ? "secondary"
                    : request.approval_status === "pending" ? "default"
                      : "destructive"
                }
                className="mt-1 rounded-md capitalize"
              >
                {request.approval_status}
              </Badge>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
