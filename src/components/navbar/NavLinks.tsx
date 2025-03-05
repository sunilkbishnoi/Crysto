
import { BarChart2, Heart, Newspaper, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface NavLinkProps {
  to: string;
  icon: JSX.Element;
  label: string;
  isActive: boolean;
  isMobile?: boolean;
}

export function NavLink({ to, icon, label, isActive, isMobile = false }: NavLinkProps) {
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-${isMobile ? '3' : '2'} ${isMobile ? 'px-2 py-2 rounded-md' : ''} ${
        isActive 
          ? `${isMobile ? 'bg-primary/10' : ''} text-primary font-semibold` 
          : `text-foreground hover:${isMobile ? 'bg-muted' : ''} hover:text-primary`
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export function NavLinks({ isMobile = false }: { isMobile?: boolean }) {
  const location = useLocation();
  
  const navLinks = [
    { to: "/", icon: <Home className="h-5 w-5" />, label: "Home" },
    { to: "/markets", icon: <BarChart2 className="h-5 w-5" />, label: "Markets" },
    { to: "/favorites", icon: <Heart className="h-5 w-5" />, label: "Favorites" },
    { to: "/news", icon: <Newspaper className="h-5 w-5" />, label: "News" },
  ];

  return (
    <>
      {navLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          icon={link.icon}
          label={link.label}
          isActive={location.pathname === link.to}
          isMobile={isMobile}
        />
      ))}
    </>
  );
}
