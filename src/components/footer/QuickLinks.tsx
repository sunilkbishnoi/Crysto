
import { Link } from "react-router-dom";
import { FileQuestion, HelpCircle, Shield, Mail } from "lucide-react";

interface QuickLinksProps {
  onContactClick: () => void;
}

export function QuickLinks({ onContactClick }: QuickLinksProps) {
  return (
    <div className="flex flex-col items-start justify-start space-y-3">
      <h3 className="text-sm font-semibold">Quick Links</h3>
      <div className="grid grid-cols-1 gap-y-1.5">
        <Link to="/faq" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
          <FileQuestion className="h-3.5 w-3.5" />
          <span>FAQ</span>
        </Link>
        <Link to="/help" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Help Center</span>
        </Link>
        <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
          <Shield className="h-3.5 w-3.5" />
          <span>Privacy Policy</span>
        </Link>
        <button 
          onClick={onContactClick}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors text-left flex items-center gap-1.5"
        >
          <Mail className="h-3.5 w-3.5" />
          <span>Contact</span>
        </button>
      </div>
    </div>
  );
}
