import Image from "next/image";
import { FaUserTie, FaUser } from "react-icons/fa";

interface SiteHeaderProps {
    role: string;
    setRole: (value: string) => void;
}

export function SiteHeader({ role, setRole }: SiteHeaderProps) {
    return (
       <header className="fixed top-0 z-50 flex items-center justify-between px-6 py-4 w-full text-black dark:text-white">
    {/* Logo */}
        <div className="flex items-center">
        <Image
            src="/LOGO1.svg"
            alt="Applus Logo"
            width={120}
            height={40}
        />
        </div>
    </header>
    );
}