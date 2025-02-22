
import { TableCell, TableRow } from "@/components/ui/table";

export function LoadingTableRow() {
  return (
    <TableRow>
      <TableCell>
        <div className="h-4 w-8 bg-muted rounded animate-pulse" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-4 bg-muted rounded animate-pulse" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-24 bg-muted rounded animate-pulse" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-20 bg-muted rounded animate-pulse" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-16 bg-muted rounded animate-pulse" />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <div className="h-4 w-28 bg-muted rounded animate-pulse" />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <div className="h-4 w-24 bg-muted rounded animate-pulse" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-8 bg-muted rounded animate-pulse" />
      </TableCell>
    </TableRow>
  );
}
