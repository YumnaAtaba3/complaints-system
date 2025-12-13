import React from "react";
import { useTranslation } from "react-i18next";

interface LogsPaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

const LogsPagination: React.FC<LogsPaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
  totalItems,
  itemsPerPage,
}) => {
  const safeTotal = totalItems || 0;
  const safePage = currentPage || 1;

  const startIndex = safeTotal === 0 ? 0 : (safePage - 1) * itemsPerPage + 1;
  const endIndex =
    safeTotal === 0 ? 0 : Math.min(safePage * itemsPerPage, safeTotal);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 border-t border-border">
      <div className="text-sm text-muted-foreground">
        {safeTotal === 0
          ? t("noLogsFound")
          : `${t("showingLogs")} ${startIndex} ${t("toLogs")} ${endIndex} ${t(
              "ofLogs"
            )} ${safeTotal} ${t("logs")}`}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border"
          >
            {t("previous")}
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className={`px-3 py-1 rounded ${
                currentPage === p ? "bg-gold text-white" : "border"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border"
          >
            {t("next")}
          </button>
        </div>
      )}
    </div>
  );
};

export default LogsPagination;
