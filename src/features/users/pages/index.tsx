import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import UsersTable from "../components/users-table";
import UsersFilters from "../components/users-filter";
import UsersPagination from "../components/users-pagination";

const mockUsers = [
  {
    id: "1",
    firstName: "أحمد",
    lastName: "محمد",
    email: "ahmed.mohamed@example.com",
    phone: "+966501234567",
    nationalNumber: "1234567890",
    governmentUnitId: 1,
  },
  {
    id: "2",
    firstName: "فاطمة",
    lastName: "علي",
    email: "fatima.ali@example.com",
    phone: "+966509876543",
    nationalNumber: "0987654321",
    governmentUnitId: 2,
  },
  // More mock users...
];

const UsersPage: React.FC = () => {
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGovernmentUnit, setSelectedGovernmentUnit] =
    useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const q = searchQuery.trim().toLowerCase();

      const matchesSearch =
        q === "" ||
        fullName.includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.phone.includes(q) ||
        user.nationalNumber.includes(q);

      const matchesUnit =
        selectedGovernmentUnit === "all" ||
        user.governmentUnitId.toString() === selectedGovernmentUnit;

      return matchesSearch && matchesUnit;
    });
  }, [searchQuery, selectedGovernmentUnit]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / itemsPerPage)
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(filteredUsers.length, startIndex + itemsPerPage);
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="container py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <h1 className="text-3xl font-extrabold text-gold">
          {t("usersManagement")}
        </h1>
        <Button
          onClick={() => console.log("add user")}
          className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          <span>{t("addUser")}</span>
        </Button>
      </div>

      <div className="card">
        <UsersFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedGovernmentUnit={selectedGovernmentUnit}
          setSelectedGovernmentUnit={setSelectedGovernmentUnit}
        />

        <UsersTable users={currentUsers} />

        <UsersPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          filteredUsersLength={filteredUsers.length}
        />
      </div>
    </div>
  );
};

export default UsersPage;
