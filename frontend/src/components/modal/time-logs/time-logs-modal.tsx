"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimeLogModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: { date: Date; time: string; logType: string; comment: string }) => void
}

export default function TimeLogModal({ isOpen, onClose, onSubmit }: TimeLogModalProps) {
    const [date, setDate] = useState<Date>(new Date())
    const [time, setTime] = useState<string>("00:00")
    const [logType, setLogType] = useState<string>("")
    const [comment, setComment] = useState<string>("")

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Add Time Log</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-3 gap-4">
                        {/* Date Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Date</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left">
                                        {format(date, "MMM dd, yyyy")}
                                        <CalendarIcon className="ml-auto h-4 w-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={(date) => date && setDate(date)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Time Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Time</label>
                            <Select value={time} onValueChange={setTime}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Array.from({ length: 24 }).map((_, hour) =>
                                        Array.from({ length: 4 }).map((_, minute) => {
                                            const timeValue = `${String(hour).padStart(2, '0')}:${String(minute * 15).padStart(2, '0')}`
                                            return (
                                                <SelectItem key={timeValue} value={timeValue}>
                                                    {timeValue}
                                                </SelectItem>
                                            )
                                        })
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Log Type Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Log Type</label>
                            <Select value={logType} onValueChange={setLogType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Log Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Clock In">Clock In</SelectItem>
                                    <SelectItem value="Clock Out">Clock Out</SelectItem>
                                    <SelectItem value="Late Clock In">Late Clock In</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Comment Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Comment</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full min-h-[100px] rounded-md border border-input px-3 py-2 text-sm"
                            placeholder="Enter a comment..."
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                        onClick={() => {
                            onSubmit({ date, time, logType, comment })
                            onClose()
                        }}
                    >
                        Add
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}