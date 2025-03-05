
import { Instagram, Twitter, Github, Mail, Phone } from "lucide-react";

export function SocialLinks() {
  return (
    <div className="flex flex-col items-start justify-start space-y-3">
      <h3 className="text-sm font-semibold">Connect With Us</h3>
      <div className="flex gap-5">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label="Instagram"
        >
          <Instagram className="h-5 w-5" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label="Twitter"
        >
          <Twitter className="h-5 w-5" />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label="GitHub"
        >
          <Github className="h-5 w-5" />
        </a>
      </div>
      <div className="text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5 mb-1">
          <Mail className="h-3.5 w-3.5 text-muted-foreground" />
          <span>support@cryptomarket.com</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Phone className="h-3.5 w-3.5 text-muted-foreground" />
          <span>+1 (888) 123-4567</span>
        </div>
      </div>
    </div>
  );
}
