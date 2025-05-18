"use client"

import React from "react"
import {
    Dialog,
    DialogContent,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ConfirmDeleteModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    scheduleName: string
}

export function ConfirmDeleteModal({
    isOpen,
    onClose,
    onConfirm,
    scheduleName
}: ConfirmDeleteModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <h2 className="text-lg font-semibold mb-2">
                    Are you sure you want to delete "{scheduleName}"?
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                    This action cannot be undone. This will permanently delete the schedule.
                </p>
                <DialogFooter className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="default"
                        className="bg-orange-500 hover:bg-orange-600"
                        onClick={onConfirm}
                    >
                        Continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}