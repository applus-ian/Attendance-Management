import Image from "next/image";
import { FaUserTie, FaUser } from "react-icons/fa";

interface SiteHeaderProps {
    role: string;
    setRole: (value: string) => void;
}

export function SiteHeader({ role, setRole }: SiteHeaderProps) {
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
        </header>
    );
}