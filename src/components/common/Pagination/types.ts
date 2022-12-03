export interface PaginationProps {
  canPreviousPage: boolean;
  canNextPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
  pageCount: number;
  currentPage: number;
  pageSize: number;
  gotoPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
}
