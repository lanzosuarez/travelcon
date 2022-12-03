import { PaginationState } from "@tanstack/react-table";
import React from "react";

export const usePaginationState = (
  defaultPagination: PaginationState,
  onPaginationChange: (pagination: PaginationState) => void
) => {
  // Pagination State
  const [pagination, setPagination] =
    React.useState<PaginationState>(defaultPagination);

  React.useEffect(() => {
    onPaginationChange(pagination);
  }, [pagination, onPaginationChange]);

  const value = React.useMemo(
    () => [pagination, setPagination] as const,
    [pagination, setPagination]
  );

  return value;
};
