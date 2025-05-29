"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, Upload } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AccountProfile() {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [date, setDate] = useState<Date | undefined>(new Date("2001-04-11"))

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-4 pb-6 border-b">
        <Avatar className="h-24 w-24">
          <AvatarImage src={profileImage || "/placeholder.svg?height=96&width=96"} alt="Profile" />
          <AvatarFallback>SA</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-xl font-semibold">Super Admin</h2>
          <p className="text-muted-foreground">superadmin@gmail.com</p>
          <div className="mt-2">
            <Button className="bg-orange-500 hover:bg-orange-600" asChild>
              <label>
                <Upload className="mr-2 h-4 w-4" />
                Upload Picture
                <input type="file" className="sr-only" onChange={handleImageUpload} accept="image/*" />
              </label>
            </Button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Shiela Marie Arcillo" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob">Date of birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select defaultValue="male">
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="Shielaarcillo@gmail.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" defaultValue="09090909099" />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              rows={3}
              defaultValue="5275 Market St, San Diego, Cebu City, Cebu, Philippines 6000"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
