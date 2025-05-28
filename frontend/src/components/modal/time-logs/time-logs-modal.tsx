"use client"

import { useState, useEffect } from "react"
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
    onSubmit: (data: any) => void
    initialData?: any
    mode?: 'add' | 'edit'
}

export default function TimeLogModal({ isOpen, onClose, onSubmit, initialData, mode = 'add' }: TimeLogModalProps) {
    const [date, setDate] = useState<Date>(new Date())
    const [time, setTime] = useState<string>("00:00")
    const [logType, setLogType] = useState<string>("")
    const [comment, setComment] = useState<string>("")

    
    useEffect(() => {
        if (initialData) {
            if (initialData.date) setDate(new Date(initialData.date))
            // Parse time from initialData.time (which may be a datetime or date string)
            if (initialData.time) {
                let t = initialData.time
                if (typeof t === 'string') {
                    const match = t.match(/(\d{2}:\d{2})/)
                    t = match ? match[1] : t
                }
                setTime(t)
            }
            
            if (initialData.logType) setLogType(initialData.logType)
            else if (initialData.type) setLogType(initialData.type)
            if (initialData.comment) setComment(initialData.comment)
        }
    }, [initialData])

    const getDisplayTime = (t: string) => {
        if (!t) return '';
        const match = t.match(/(\d{2}:\d{2})/);
        return match ? match[1] : t;
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]" aria-describedby="timelog-modal-desc">
                <p id="timelog-modal-desc" className="sr-only">Fill out the form to add a new time log entry. All fields are required unless marked optional.</p>
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">{mode === 'edit' ? 'Edit Time Log' : 'Add Time Log'}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-3 gap-4">
                        {/* Date Field (hidden in edit mode) */}
                        {mode !== 'edit' && (
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
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        )}

                        {/* Time Field (read-only in edit mode) */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Time</label>
                            {mode === 'edit' ? (
                                <input
                                    type="text"
                                    value={getDisplayTime(time)}
                                    readOnly
                                    className="w-full rounded-md border border-input px-3 py-2 text-sm bg-gray-100 cursor-not-allowed"
                                />
                            ) : (
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
                            )}
                        </div>

                        {/* Log Type Field (read-only in edit mode) */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Log Type</label>
                            {mode === 'edit' ? (
                                <input
                                    type="text"
                                    value={logType}
                                    readOnly
                                    className="w-full rounded-md border border-input px-3 py-2 text-sm bg-gray-100 cursor-not-allowed"
                                />
                            ) : (
                                <Select value={logType} onValueChange={setLogType}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Log Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="clock_in">Clock In</SelectItem>
                                        <SelectItem value="clock_out">Clock Out</SelectItem>
                                        <SelectItem value="overtime">Overtime</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
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
                            if (mode === 'edit') {
                                onSubmit({ comment })
                            } else {
                                onSubmit({ date, time, type: logType, comment })
                            }
                            onClose()
                        }}
                    >
                        {mode === 'edit' ? 'Save Changes' : 'Add'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}