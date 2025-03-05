
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNewsData } from "@/hooks/useNewsData";
import { NewsSearch } from "@/components/news/NewsSearch";
import { CategoryFilter } from "@/components/news/CategoryFilter";
import { NewsList } from "@/components/news/NewsList";
import { Card, CardContent } from "@/components/ui/card";
import { useNewsFilter } from "@/hooks/useNewsFilter";

export default function News() {
  const { data: news, isLoading, error } = useNewsData();
  const {
    searchTerm,
    setSearchTerm,
    selectedCategories,
    handleCategoryChange,
    activeTab,
    setActiveTab,
    filteredNews
  } = useNewsFilter(news);

  const categories = [
    "Cryptocurrency",
    "Bitcoin",
    "Ethereum",
    "DeFi",
    "NFT",
    "Trading",
    "Technology",
    "Business",
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="relative">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary/90 to-primary/50 text-primary-foreground py-2 px-6 transform skew-x-12 inline-block shadow-[3px_3px_0px_rgb(0_0_0/0.3)]">
              <span className="transform -skew-x-12 inline-block">Market News</span>
            </h1>
            <div className="absolute -bottom-2 right-0 w-12 h-1 bg-primary/70 transform skew-x-12"></div>
          </div>
          <p className="text-muted-foreground mt-5">
            Stay updated with the latest market news and trends
          </p>
        </header>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <NewsSearch 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            <div className="flex gap-2">
              <CategoryFilter
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All News</TabsTrigger>
              <TabsTrigger value="crypto">Crypto</TabsTrigger>
              <TabsTrigger value="stocks">Stocks</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {error ? (
                <Card>
                  <CardContent className="text-center py-6">
                    <p className="text-muted-foreground">Failed to load news. Please try again later.</p>
                  </CardContent>
                </Card>
              ) : (
                <NewsList
                  news={filteredNews}
                  isLoading={isLoading}
                  formatDate={formatDate}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
