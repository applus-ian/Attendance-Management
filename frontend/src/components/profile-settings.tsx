"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera, Loader2 } from "lucide-react"

export default function ProfileSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Anytown, USA",
    jobDescription: "Senior Software Engineer with 5+ years of experience in web development.",
  })
  const [avatarUrl, setAvatarUrl] = useState("/placeholder.svg?height=100&width=100")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatarUrl(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container mx-auto max-w-2xl py-10 px-4 md:px-8">
      <div className="bg-orange-500 text-white py-6 px-4 rounded-t-lg">
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        
      </div>
      <div className="bg-white border border-gray-200 rounded-b-lg p-6 shadow-sm">
        <div className="space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-orange-500 overflow-hidden bg-gray-100 flex items-center justify-center">
                {avatarUrl ? (
                  <img src={avatarUrl || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-2xl text-gray-400">
                    {profileData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 right-0">
                <Label
                  htmlFor="avatar-upload"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white cursor-pointer hover:bg-orange-600 transition-colors"
                >
                  <Camera size={18} />
                  <span className="sr-only">Upload profile picture</span>
                </Label>
                <Input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>
            <p className="text-sm text-gray-500">Click the camera icon to change your profile picture</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <p className="text-gray-700">{profileData.name}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <p className="text-gray-700">{profileData.email}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <p className="text-gray-700">{profileData.phone}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <p className="text-gray-700">{profileData.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
