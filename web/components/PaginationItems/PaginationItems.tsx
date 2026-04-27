import {
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components";

interface IPaginationItemsProps {
  totalPages: any;
  page: number;
  setPage: (page: number) => void;
}

export function PaginationItems({
  page,
  totalPages,
  setPage,
}: IPaginationItemsProps) {
  const getVisiblePages: () => (number | string)[] = () => {
    const PAGES_LIMIT = 5;
    const END_PAGES_PARAM = 2;

    const visiblePages: (number | string)[] = [];

    if (totalPages <= PAGES_LIMIT) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      if (page <= END_PAGES_PARAM + 1) {
        visiblePages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - END_PAGES_PARAM) {
        visiblePages.push(
          1,
          "...",
          totalPages - (END_PAGES_PARAM + 1),
          totalPages - END_PAGES_PARAM,
          totalPages - (END_PAGES_PARAM - 1),
          totalPages,
        );
      } else {
        visiblePages.push(
          1,
          "...",
          page - 1,
          page,
          page + 1,
          "...",
          totalPages,
        );
      }
    }
    return visiblePages;
  };

  const handlePagination = (
    e: React.MouseEvent<HTMLAnchorElement>,
    page: number,
  ) => {
    e.preventDefault();
    setPage(page);
  };

  return getVisiblePages().map((p, index) => {
    const pageNumber = p as number;
    return p === "..." ? (
      <PaginationItem key={`ellipsis-${index}`}>
        <PaginationEllipsis />
      </PaginationItem>
    ) : (
      <PaginationItem key={`page-${pageNumber}`}>
        <PaginationLink
          href="#"
          isActive={page === pageNumber}
          onClick={(e) => {
            handlePagination(e, pageNumber);
          }}
        >
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    );
  });
}
