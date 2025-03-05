
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Book, PlayCircle, MessageCircle, Mail, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const HelpCenter = () => {
  const helpCategories = [
    {
      title: "Getting Started",
      description: "New to CRYST0? Learn the basics here.",
      icon: PlayCircle,
      links: [
        { title: "Platform Overview", path: "#" },
        { title: "Creating an Account", path: "#" },
        { title: "Navigating the Dashboard", path: "#" }
      ]
    },
    {
      title: "User Guides",
      description: "Comprehensive guides for all features.",
      icon: Book,
      links: [
        { title: "Market Analysis Tools", path: "#" },
        { title: "Portfolio Tracking", path: "#" },
        { title: "Technical Indicators", path: "#" }
      ]
    },
    {
      title: "FAQ",
      description: "Quick answers to common questions.",
      icon: HelpCircle,
      links: [
        { title: "Browse FAQs", path: "/faq" },
        { title: "Account Questions", path: "#" },
        { title: "Subscription Plans", path: "#" }
      ]
    },
    {
      title: "Video Tutorials",
      description: "Visual guides for platform features.",
      icon: GraduationCap,
      links: [
        { title: "Beginner Series", path: "#" },
        { title: "Advanced Trading", path: "#" },
        { title: "AI Analysis Features", path: "#" }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onCurrencyChange={() => {}} />
      
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-3">Help Center</h1>
          <p className="text-muted-foreground text-center mb-8">
            Get the support you need to make the most of CRYST0
          </p>
          <Separator className="my-6" />
          
          <div className="bg-primary/5 border border-border rounded-lg p-6 mb-12">
            <h2 className="text-2xl font-semibold mb-3">How can we help?</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <Button className="flex-1">
                <MessageCircle className="mr-2 h-4 w-4" />
                Live Chat
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => window.location.href = "mailto:support@cryptomarket.com"}>
                <Mail className="mr-2 h-4 w-4" />
                Email Support
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {helpCategories.map((category) => (
              <Card key={category.title} className="border border-border">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <category.icon className="h-6 w-6 text-primary" />
                    <CardTitle>{category.title}</CardTitle>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.links.map((link) => (
                      <li key={link.title}>
                        <Link 
                          to={link.path} 
                          className="text-sm text-primary hover:underline hover:text-primary/80"
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 p-6 border border-border rounded-lg bg-card/30 text-center">
            <h3 className="text-xl font-semibold mb-3">Still need help?</h3>
            <p className="text-muted-foreground mb-4">
              Our support team is available 24/7 to assist you with any questions.
            </p>
            <Button onClick={() => window.location.href = "mailto:support@cryptomarket.com"}>
              Contact Support
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HelpCenter;
