"use client";
import { EmployeeForm } from "@/components/employeelogin-form";
import { AdminForm } from "@/components/adminlogin-form";
import Image from "next/image";
import { SiteHeader } from "@/components/ui/header";
import { useState } from "react";

export default function LoginPage() {
    const [role, setRole] = useState("");

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <SiteHeader role={role} setRole={setRole} />
            <main className="flex-1">
                <div className="grid min-h-screen lg:grid-cols-2">
                    <div className="flex flex-col gap-4 p-6 md:p-10">
                        <div className="flex flex-1 items-center justify-center">
                            {role && (
                                <div className="w-full max-w-sm text-center">
                                    <h1 className="text-2xl font-bold">Login</h1>
                                    <p className="text-muted-foreground text-sm text-balance">
                                        Enter your {role.toLowerCase()} credentials
                                    </p>
                                    {role === "Employee" ? (
                                        <EmployeeForm className="space-y-4 mt-8" />
                                    ) : role === "Admin" ? (
                                        <AdminForm className="space-y-4 mt-8" />
                                    ) : (
                                        <div className="text-center text-gray-500">
                                            Please select a role to continue
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="relative hidden lg:block">
                        <Image
                            className="absolute inset-0 h-full w-full object-cover"
                            src="/bg1.svg"
                            alt="Applus Background"
                            fill
                            priority
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}