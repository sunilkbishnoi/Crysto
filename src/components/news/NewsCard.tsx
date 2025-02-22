
import { Clock, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NewsItem } from "@/types/market";

interface NewsCardProps {
  item: NewsItem;
  formatDate: (dateString: string) => string;
}

export const NewsCard = ({ item, formatDate }: NewsCardProps) => {
  return (
    <Card className="overflow-hidden">
      {item.thumbnail && (
        <div className="relative h-48">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="line-clamp-2">{item.title}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          {formatDate(item.published_at)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground line-clamp-3">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {item.categories.slice(0, 3).map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>
        <Button asChild variant="outline" className="w-full gap-2">
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            Read More <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};
