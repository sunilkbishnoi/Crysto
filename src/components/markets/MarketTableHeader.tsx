
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function MarketTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px]">Rank</TableHead>
        <TableHead>Favorite</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>24h Change</TableHead>
        <TableHead className="hidden md:table-cell">Market Cap</TableHead>
        <TableHead className="hidden md:table-cell">Volume (24h)</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
