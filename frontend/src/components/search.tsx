import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Search({ placeholder, value, onChange }: SearchProps) {
  return (
    <div className="relative w-full sm:max-w-md">
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-10 w-full"
      />
    </div>
  );
}
