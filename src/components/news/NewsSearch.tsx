
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface NewsSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const NewsSearch = ({ searchTerm, onSearchChange }: NewsSearchProps) => {
  return (
    <div className="relative w-full sm:w-[300px]">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search news..."
        className="pl-9"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};
