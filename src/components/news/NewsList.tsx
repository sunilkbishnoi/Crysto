
import { NewsCard } from "./NewsCard";
import { Card, CardContent } from "@/components/ui/card";
import { NewsItem } from "@/types/market";

interface NewsListProps {
  news: NewsItem[] | undefined;
  isLoading: boolean;
  formatDate: (dateString: string) => string;
}

export const NewsList = ({ news, isLoading, formatDate }: NewsListProps) => {
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="animate-pulse space-y-2 p-6">
              <div className="h-4 w-3/4 bg-muted rounded" />
              <div className="h-3 w-1/2 bg-muted rounded" />
              <div className="h-20 bg-muted rounded mt-4" />
              <div className="h-3 w-1/4 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!news || news.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-6">
          <p className="text-muted-foreground">No news found matching your criteria.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {news.map((item) => (
        <NewsCard key={item.id} item={item} formatDate={formatDate} />
      ))}
    </div>
  );
};
