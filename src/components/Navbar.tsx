
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { LogoAnimation } from "./navbar/LogoAnimation";
import { NavLinks } from "./navbar/NavLinks";
import { MobileMenu } from "./navbar/MobileMenu";
import { SearchBar } from "./navbar/SearchBar";
import { CurrencyToggle } from "./navbar/CurrencyToggle";

interface NavbarProps {
  onCurrencyChange?: (newCurrency: 'INR' | 'USD') => void;
}

export function Navbar({ onCurrencyChange }: NavbarProps = {}) {
  return (
    <>
      <LogoAnimation />
      <nav className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container px-4 mx-auto">
          <div className="flex h-16 items-center justify-between">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <NavLinks />
            </div>
            
            {/* Mobile Navigation */}
            <MobileMenu />
            
            <div className="flex items-center gap-2">
              <SearchBar />
              <CurrencyToggle onCurrencyChange={onCurrencyChange} />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
