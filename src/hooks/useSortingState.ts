import { SortingState } from "@tanstack/react-table";
import React from "react";

export const useSortingState = (
  defaultSort: SortingState,
  onSortChange: (sortingState: SortingState) => void
) => {
  const [sorting, setSorting] = React.useState<SortingState>(defaultSort);

  React.useEffect(() => {
    onSortChange(sorting);
  }, [sorting]);

  const value = React.useMemo(
    () => [sorting, setSorting] as const,
    [sorting, setSorting]
  );

  return value;
};
