
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Github, Twitter } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

interface TeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teamMembers: TeamMember[];
}

export function TeamDialog({ open, onOpenChange, teamMembers }: TeamDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Meet Our Team</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
          {teamMembers.map((member) => (
            <div key={member.name} className="border border-border rounded-lg overflow-hidden bg-card/30">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                <div className="flex mt-3 gap-3">
                  {member.social.github && (
                    <a 
                      href={member.social.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a 
                      href={member.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a 
                      href={member.social.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
