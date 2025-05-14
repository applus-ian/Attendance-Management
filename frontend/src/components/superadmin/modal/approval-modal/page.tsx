"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ApprovalModalProps {
    isOpen: boolean
    onClose: () => void
    onContinue: (feedback: string) => void
    isReject: boolean
}

export default function ApprovalModal({ isOpen, onClose, onContinue }: ApprovalModalProps) {
    const [feedback, setFeedback] = useState("")

    const handleContinue = () => {
        onContinue(feedback)
        setFeedback("")
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="flex flex-row items-start justify-between">
                    <DialogTitle className="text-lg font-medium">Do you want to approved this request?</DialogTitle>
                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={onClose}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Button>
                </DialogHeader>
                <div className="space-y-4 py-2">
                    <div className="space-y-2">
                        <label htmlFor="feedback" className="text-sm font-medium">
                            Feedback (Optional)
                        </label>
                        <Textarea
                            id="feedback"
                            placeholder="Type your message here."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="min-h-[100px]"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleContinue} className="bg-orange-500 hover:bg-orange-600 text-white">
                            Continue
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}