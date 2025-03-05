
import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function SearchBar() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Close search when route changes
  useEffect(() => {
    setShowSearch(false);
  }, [location.pathname]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  // Handle form submission
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/markets?search=${searchQuery}`);
      setShowSearch(false);
    }
  };

  return (
    <>
      {/* Search Form - Conditionally shown */}
      {showSearch && (
        <form 
          onSubmit={handleSearchSubmit}
          className="fixed inset-x-0 top-16 p-2 bg-background/95 backdrop-blur z-50 md:relative md:top-auto md:p-0 md:bg-transparent md:z-auto"
        >
          <div className="relative flex w-full max-w-md mx-auto md:mx-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search markets..."
              className="w-full pl-9 pr-9"
              value={searchQuery}
              onChange={handleSearch}
              autoFocus
            />
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowSearch(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </form>
      )}
      
      {/* Search button - always visible */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowSearch(!showSearch)}
        className="hover:bg-primary/10 md:flex"
      >
        <Search className="h-5 w-5" />
      </Button>
    </>
  );
}
