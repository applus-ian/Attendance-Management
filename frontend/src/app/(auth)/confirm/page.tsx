"use client";

import { ConfirmForm } from "@/components/login/confirm-form";
import Image from "next/image";
import { SiteHeader } from "@/components/ui/header1";
import { useState } from "react";

export default function ConfirmPage() {
    const [role, setRole] = useState("Employee"); // Shared state

    return (
        <div className="flex h-screen flex-col bg-background overflow-hidden">
            <SiteHeader role={role} setRole={setRole} /> {/* Pass state to header */}
            <main className="flex-1">
                <div className="grid h-full lg:grid-cols-2">
                    <div className="flex flex-col gap-4 p-6 md:p-10">
                        <div className="flex flex-1 items-center justify-center">
                            <div className="w-full max-w-xs">
                                {/* Role Selection */}
                                <div className="mb-4">

                                </div>
                                <ConfirmForm />
                            </div>
                        </div>
                    </div>
                    <div className="relative hidden bg-muted lg:block h-full">
                        <Image
                            className="absolute inset-0 h-full w-full object-cover"
                            src="/bg1.svg"
                            alt=""
                            fill
                            priority
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}