import { useState, useRef, useEffect } from "react";
import { FaUserTie, FaUser } from "react-icons/fa";
import Image from "next/image";

interface SiteHeaderProps {
    role: string;
    setRole: (role: string) => void;
}

export function SiteHeader({ role, setRole }: SiteHeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Add this useEffect to set initial role
    useEffect(() => {
        if (!role) {
            setRole("Employee");
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
            <div className="flex items-center">
                <Image
                    src="/logo.svg"
                    alt="Applus Logo"
                    width={100}
                    height={32}
                />
            </div>

            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between w-32 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                    <span className="text-sm">{role || "Employee"}</span>
                    <svg
                        className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg py-1 z-10">
                        <button
                            className={`flex items-center w-full px-4 py-2 text-sm ${role === "Employee" ? 'text-orange-500 bg-orange-50' : 'text-gray-700 hover:bg-gray-50'}`}
                            onClick={() => {
                                setRole("Employee");
                                setIsOpen(false);
                            }}
                        >
                            <FaUser className="mr-2" />
                            Employee
                        </button>
                        <button
                            className={`flex items-center w-full px-4 py-2 text-sm ${role === "Admin" ? 'text-orange-500 bg-orange-50' : 'text-gray-700 hover:bg-gray-50'}`}
                            onClick={() => {
                                setRole("Admin");
                                setIsOpen(false);
                            }}
                        >
                            <FaUserTie className="mr-2" />
                            Admin
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}