"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { AccountProfile } from "@/components/admin/account-settings/account-profile"
import { ChangePassword } from "@/components/admin/account-settings/change-password"

export function AccountSettingsTabs() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="password">Change Password</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <AccountProfile />
      </TabsContent>
      <TabsContent value="password">
        <ChangePassword />
      </TabsContent>
    </Tabs>
  )
}
