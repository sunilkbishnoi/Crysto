
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { NavLinks } from "./NavLinks";
import { useEffect } from "react";

export function MobileMenu() {
  // Add effect to scroll to top when mobile menu is opened/closed
  useEffect(() => {
    const handleNavigation = () => {
      window.scrollTo(0, 0);
    };

    // Add event listener for route changes
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('a[href]')) {
        handleNavigation();
      }
    });

    return () => {
      document.removeEventListener("click", handleNavigation);
    };
  }, []);

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-primary/10">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <div className="flex flex-col gap-6 pt-6">
            <NavLinks isMobile={true} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
