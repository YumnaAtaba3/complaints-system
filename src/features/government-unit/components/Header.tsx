import React from "react";
import { Button } from "@/shared/components/ui/button";

type Props = {
  onAdd: () => void;
};

export const Header: React.FC<Props> = ({ onAdd }) => (
  <div className="flex justify-between gap-4 mb-4">
    {/* Title & Subtitle */}
    <div className="flex flex-col gap-1 mb-2">
      <h1 className="ml-3 text-foreground text-3xl font-bold">
        Government Units
      </h1>
      <p className="ml-3 text-muted-foreground text-sm sm:text-base">
        Manage government units — view, create, edit, enable/disable, and assign
        managers.
      </p>
    </div>

    {/* Add Button */}
    <Button
      onClick={onAdd}
      className="flex gap-2 px-4 py-4 rounded-xl bg-gold text-white font-semibold shadow-md hover:bg-gold/90 transition items-center"
    >
      + Add Government Units
    </Button>
  </div>
);
