import Image from "next/image";
import { FaUserTie, FaUser } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

interface SiteHeaderProps {
    role: string;
    setRole: (value: string) => void;
}

export function SiteHeader({ role, setRole }: SiteHeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
            {/* Logo */}
            <div className="flex items-center">
                <Image
                    src="/logo.svg"
                    alt="Applus Logo"
                    width={120}
                    height={40}
                />
            </div>

            {/* Custom Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between w-48 px-4 py-3 text-xl font-normal text-white bg-orange-500 rounded-xl hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                    <span>{role || "login as"}</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg">
                        <button
                            className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-50"
                            onClick={() => {
                                setRole("Employee");
                                setIsOpen(false);
                            }}
                        >
                            <FaUser className="mr-2" />
                            <span>Employee</span>
                        </button>
                        <button
                            className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-50"
                            onClick={() => {
                                setRole("Admin");
                                setIsOpen(false);
                            }}
                        >
                            <FaUserTie className="mr-2" />
                            <span>Admin</span>
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}