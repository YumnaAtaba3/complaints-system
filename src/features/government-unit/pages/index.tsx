import React from "react";
import { Loader2 } from "lucide-react";
import { UnitsTable } from "../components/UnitsTable";
import { Filters } from "../components/Filters";
import { CreateUnitModal } from "../components/CreateUnitModal";
import { EditUnitModal } from "../components/EditUnitModal";
import { Header } from "../components/Header";
import { useGovernmentUnitsPage } from "../hooks/useGovernmentUnits";
import { Pagination } from "../components/unitPagination";

const GovernmentUnitsPage: React.FC = () => {
  const { state, actions } = useGovernmentUnitsPage();

  return (
    <div className="container py-6">
      <Header onAdd={() => actions.setShowCreate(true)} />

      <div className="card">
        <Filters
          searchQuery={state.searchQuery}
          onSearchChange={actions.setSearchQuery}
          statusFilter="all"
          onStatusChange={() => {}}
          managerFilter={state.managerFilter}
          onManagerChange={actions.setManagerFilter}
          includeTrashed={state.includeTrashed}
          onIncludeTrashedChange={(v) => {
            actions.setIncludeTrashed(v);
            actions.setCurrentPage(1);
          }}
          itemsPerPage={state.itemsPerPage}
          onItemsPerPageChange={(v) => {
            actions.setItemsPerPage(v);
            actions.setCurrentPage(1);
          }}
        />

        {state.loadingUnits || state.filtering ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="animate-spin h-12 w-12 text-muted-foreground" />
          </div>
        ) : (
          <UnitsTable
            units={state.filteredUnits}
            onEdit={actions.openEditModal}
            onToggleActive={actions.handleToggleActive}
          />
        )}

        <div className="flex items-center justify-between p-4 border-t">
          <div className="text-sm text-gray-600">
            Showing{" "}
            {state.filteredUnits.length
              ? (state.currentPage - 1) * state.itemsPerPage + 1
              : 0}{" "}
            to{" "}
            {(state.currentPage - 1) * state.itemsPerPage +
              state.filteredUnits.length}{" "}
            of {state.totalUnits} units
          </div>

          <Pagination
            currentPage={state.currentPage}
            totalPages={state.totalPages}
            onPageChange={actions.setCurrentPage}
          />
        </div>
      </div>

      <CreateUnitModal
        open={state.showCreate}
        onOpenChange={actions.setShowCreate}
        nameEn={state.createForm.nameEn}
        setNameEn={(v) =>
          actions.setCreateForm({ ...state.createForm, nameEn: v })
        }
        nameAr={state.createForm.nameAr}
        setNameAr={(v) =>
          actions.setCreateForm({ ...state.createForm, nameAr: v })
        }
        managers={state.managers}
        selectedManagerId={state.createForm.selectedManagerId}
        setSelectedManagerId={(v) =>
          actions.setCreateForm({ ...state.createForm, selectedManagerId: v })
        }
        onSubmit={actions.handleCreate}
        loading={state.createLoading}
      />

      <EditUnitModal
        open={state.showEdit}
        onOpenChange={actions.setShowEdit}
        unit={state.editingUnit}
        formNameEn={state.editForm.nameEn}
        setFormNameEn={(v) =>
          actions.setEditForm({ ...state.editForm, nameEn: v })
        }
        formNameAr={state.editForm.nameAr}
        setFormNameAr={(v) =>
          actions.setEditForm({ ...state.editForm, nameAr: v })
        }
        managers={state.managers}
        selectedManagerId={state.editForm.selectedManagerId}
        setSelectedManagerId={(v) =>
          actions.setEditForm({ ...state.editForm, selectedManagerId: v })
        }
        onSubmit={actions.handleEditSave}
        loading={state.editLoading}
      />
    </div>
  );
};

export default GovernmentUnitsPage;
