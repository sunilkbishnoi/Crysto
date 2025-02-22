
import { Link } from "react-router-dom";
import { Instagram, Twitter, Github, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Cryst0</h3>
            <p className="text-sm text-muted-foreground">
            <img src="./public/teallogo.png">
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Markets</Link>
              </li>
              <li>
                <Link to="/favorites" className="text-sm text-muted-foreground hover:text-foreground">Favorites</Link>
              </li>
              <li>
                <Link to="/news" className="text-sm text-muted-foreground hover:text-foreground">News</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Contact</h3>
            <p className="text-sm text-muted-foreground">
              Email: ihackathon2025@gmail.com<br />
            </p>
            <div className="flex justify-center gap-4 mt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:support@cryptomarket.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/40">
          <p className="text-center text-sm text-muted-foreground">
            Made with ❤️ by Team Vendetta
          </p>
        </div>
      </div>
    </footer>
  );
}
