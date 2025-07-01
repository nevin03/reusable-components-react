import React from "react";
import Button from "@components/Button";

const Pagination = ({ pageIndex, pageCount, setPageIndex, isFetching }) => {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-3 text-sm bg-white border-t border-secondary-200">
      <div className="text-center md:text-left">
        Page{" "}
        <strong>
          {pageIndex + 1} of {pageCount}
        </strong>
      </div>
      <div className="flex justify-center gap-1 flex-wrap">
        {Array.from({ length: pageCount }, (_, index) => {
          const isActive = pageIndex === index;
          return (
            <Button
              key={`page-${index}`}
              onClick={() => setPageIndex(index)}
              color="primary"
              variant="rounded"
              size="sm"
              loading={isFetching && isActive}
              disabled={isFetching && isActive}
              className={
                isActive ? "bg-primary-600 text-white hover:bg-primary-700" : ""
              }
            >
              {index + 1}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Pagination;
