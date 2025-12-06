import React from "react";
import { Button } from "@/shared/components/ui/button";

interface ComplaintsPaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  filteredComplaintsLength: number;
}

const ComplaintsPagination: React.FC<ComplaintsPaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
  startIndex,
  endIndex,
  filteredComplaintsLength,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 border-t border-border">
      {/* Info */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredComplaintsLength ? startIndex + 1 : 0} to {endIndex} of{" "}
        {filteredComplaintsLength} complaints
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="border-primary text-primary hover:bg-gold/10"
        >
          Previous
        </Button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className={`${
                currentPage === page
                  ? "bg-gold text-white"
                  : " bg-white border-primary text-primary hover:bg-gold/10"
              }`}
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="border-primary text-primary hover:bg-gold/10"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ComplaintsPagination;
