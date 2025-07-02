import React from "react";
import Button from "@components/Button";

// ✅ Define this helper function above the component
const generatePages = (current, total) => {
  const pages = [];

  if (total <= 6) {
    for (let i = 0; i < total; i++) pages.push(i);
    return pages;
  }

  pages.push(0); // Always show first page

  const siblings = 1;
  const start = Math.max(current - siblings, 1);
  const end = Math.min(current + siblings, total - 2);

  if (start > 1) pages.push("left-ellipsis");

  for (let i = start; i <= end; i++) pages.push(i);

  if (end < total - 2) pages.push("right-ellipsis");

  pages.push(total - 1); // Always show last page

  return pages;
};

const Pagination = ({ pageIndex, pageCount, setPageIndex, isFetching }) => {
  const pages = generatePages(pageIndex, pageCount);

  return (
    <div className="flex flex-col items-center gap-3 px-4 py-3 text-sm bg-white border-t border-secondary-200">
      <div className="text-center md:text-left">
        Page{" "}
        <strong>
          {pageIndex + 1} of {pageCount}
        </strong>
      </div>

      <div className="flex justify-center gap-1 flex-wrap">
        {pages.map((page, idx) => {
          if (page === "left-ellipsis" || page === "right-ellipsis") {
            return (
              <span key={`ellipsis-${idx}`} className="px-2 text-gray-500">
                ...
              </span>
            );
          }

          const isActive = page === pageIndex;

          return (
            <Button
              key={`page-${page}`}
              onClick={() => setPageIndex(page)}
              color="primary"
              variant="rounded"
              size="sm"
              loading={isFetching && isActive}
              disabled={isFetching && isActive}
              className={
                isActive ? "bg-primary-600 text-white hover:bg-primary-700" : ""
              }
            >
              {page + 1}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Pagination;
