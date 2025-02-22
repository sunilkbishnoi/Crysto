
import { useState } from "react";
import { NewsItem } from "@/types/market";

export const useNewsFilter = (news: NewsItem[] | undefined) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  const filteredNews = news?.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    const hasSearchMatch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      item.source.toLowerCase().includes(searchLower) ||
      item.categories.some(cat => cat.toLowerCase().includes(searchLower));

    const hasCategory = selectedCategories.length === 0 ||
      selectedCategories.some(cat => 
        item.categories.some(itemCat => 
          itemCat.toLowerCase() === cat.toLowerCase()
        )
      );

    const tabFilter = activeTab === "all" || 
      (activeTab === "crypto" && item.categories.some(cat => cat === "Cryptocurrency")) ||
      (activeTab === "stocks" && item.categories.some(cat => cat === "Stocks"));

    return hasSearchMatch && hasCategory && tabFilter;
  });

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories(prev =>
      checked ? [...prev, category] : prev.filter(c => c !== category)
    );
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedCategories,
    handleCategoryChange,
    activeTab,
    setActiveTab,
    filteredNews
  };
};
