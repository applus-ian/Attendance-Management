import { useState, useRef, useEffect } from "react";
import { FaUserTie, FaUser } from "react-icons/fa";
import Image from "next/image";
import { ModeToggle } from "./light-dark-mode";

interface SiteHeaderProps {
  role: string;
  setRole: (role: string) => void;
}

export function SiteHeader({ role, setRole }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!role) {
      setRole("Employee");
    }
  }, []);

  return (
    <header className="fixed top-0 z-50 flex items-center justify-between px-6 py-4 w-full text-black dark:text-white">
      <div className="flex items-center">
        <Image src="/LOGO1.svg" alt="Applus Logo" width={100} height={32} />
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <div className="relative" ref={dropdownRef}></div>
      </div>
    </header>
  );
}
