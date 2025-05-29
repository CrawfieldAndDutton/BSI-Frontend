
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

interface CustomerSearchProps {
  search: string;
  onSearchChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function CustomerSearch({ search, onSearchChange, onSubmit }: CustomerSearchProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <form onSubmit={onSubmit} className="flex-1 flex">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input 
            placeholder="Search by name or customer ID" 
            className="pl-10"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button type="submit" className="ml-2 bg-navy-800 hover:bg-navy-700">
          Search
        </Button>
      </form>
      <div className="flex items-center">
        <Button variant="outline" size="sm" className="flex items-center">
          <Filter className="mr-1 h-4 w-4" />
          Filter
        </Button>
      </div>
    </div>
  );
}
