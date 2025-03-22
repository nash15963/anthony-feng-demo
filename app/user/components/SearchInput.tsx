import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";

export default function SearchInput() {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
      <Input type="search" placeholder="Search..." className="pl-10" />
    </div>
  );
}
