import React from "react";
import { Button } from "@/shared/components/ui/button";

interface UsersPaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  filteredUsersLength: number;
}

const UsersPagination: React.FC<UsersPaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
  startIndex,
  endIndex,
  filteredUsersLength,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 border-t border-border">
      <div className="text-sm text-muted-foreground">
        Showing {filteredUsersLength ? startIndex + 1 : 0} to {endIndex} of{" "}
        {filteredUsersLength} users
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              size="sm"
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
              className={
                currentPage === page ? "bg-primary text-primary-foreground" : ""
              }
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
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default UsersPagination;
