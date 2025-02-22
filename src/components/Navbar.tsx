
import { BarChart2, Heart, Newspaper, Search, DollarSign, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { useMarketStore } from "@/stores/marketStore";

interface NavbarProps {
  onCurrencyChange?: (currency: 'INR' | 'USD') => void;
}

export function Navbar({ onCurrencyChange }: NavbarProps) {
  const [showSearch, setShowSearch] = useState(false);
  const { currency } = useMarketStore();
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Cryst0';
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const animateText = () => {
      if (isDeleting) {
        setDisplayText(fullText.substring(0, currentIndex - 1));
        currentIndex--;
        if (currentIndex <= 0) {
          isDeleting = false;
          timeoutId = setTimeout(animateText, 500); // Pause before typing again
          return;
        }
      } else {
        setDisplayText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
        if (currentIndex === fullText.length) {
          isDeleting = true;
          timeoutId = setTimeout(animateText, 1000); // Pause at full text
          return;
        }
      }

      timeoutId = setTimeout(animateText, isDeleting ? 100 : 150);
    };

    timeoutId = setTimeout(animateText, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <div className="w-full bg-background pt-4 pb-2">
        <h1 className="text-4xl font-bold text-center relative">
          <span className="text-primary">
            {displayText}
            <span className="animate-pulse inline-block ml-[2px] -translate-y-[2px]">|</span>
          </span>
        </h1>
      </div>
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container px-4 mx-auto">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary">
                <BarChart2 className="h-5 w-5" />
                <span className="font-semibold">Market</span>
              </Link>
              <Link to="/favorites" className="flex items-center gap-2 text-foreground hover:text-primary">
                <Heart className="h-5 w-5" />
                <span>Favorites</span>
              </Link>
              <Link to="/news" className="flex items-center gap-2 text-foreground hover:text-primary">
                <Newspaper className="h-5 w-5" />
                <span>News</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              {showSearch && (
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search markets..."
                    className="w-[200px] sm:w-[300px]"
                  />
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSearch(!showSearch)}
                className="hover:bg-primary/10"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCurrencyChange?.(currency === "INR" ? "USD" : "INR")}
                className="flex items-center gap-2 hover:bg-primary/10"
              >
                {currency === "INR" ? (
                  <IndianRupee className="h-4 w-4" />
                ) : (
                  <DollarSign className="h-4 w-4" />
                )}
                <span>{currency}</span>
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
