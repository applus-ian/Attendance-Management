"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Request } from "@/components/admin/request/request-table"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface RequestDetailsModalProps {
  request: Request
  isOpen: boolean
  onClose: () => void
}

export function RequestDetailsModal({ request, isOpen, onClose }: RequestDetailsModalProps) {
  const handleApprove = () => {
    console.log("Approving request:", request.id)
    onClose()
  }

  const handleReject = () => {
    console.log("Rejecting request:", request.id)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request Details</DialogTitle>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dateSubmitted" className="text-right">
              Date Submitted
            </Label>
            <Input id="dateSubmitted" value={request.dateSubmitted} readOnly className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={request.member} readOnly className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="requestType" className="text-right">
              Request Type
            </Label>
            <Input id="requestType" value={request.type} readOnly className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dateRequested" className="text-right">
              Date Requested
            </Label>
            <Input id="dateRequested" value={request.dateRequested} readOnly className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="comment" className="text-right">
              Comment
            </Label>
            <Textarea id="comment" value={request.comment} readOnly className="col-span-3" rows={3} />
          </div>
        </div>
        <DialogFooter className="sm:justify-center gap-2">
          <Button variant="destructive" onClick={handleReject}>
            Reject
          </Button>
          <Button variant="default" className="bg-green-600 hover:bg-green-700" onClick={handleApprove}>
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
