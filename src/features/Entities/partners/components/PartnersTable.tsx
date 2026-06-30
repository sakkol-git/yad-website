"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/Button";
import { PartnerFormModal } from "./PartnerFormModal";
import { deletePartner } from "@/server/actions/partner.actions";
import { DataTable, ColumnDef } from "@/shared/components/ui/DataTable";

interface Partner {
  id: string;
  name: string;
  contact_person: string | null;
  email: string | null;
  phone: string | null;
  partnership_type: string | null;
  notes: string | null;
  logo_url: string | null;
}

export function PartnersTable({
  partners,
  count,
  page,
}: {
  partners: Partner[];
  count?: number | null;
  page?: number;
}) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    partner: Partner | null;
  }>({
    isOpen: false,
    mode: "create",
    partner: null,
  });

  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const openCreate = () => setModalState({ isOpen: true, mode: "create", partner: null });
  const openEdit = (partner: Partner) => setModalState({ isOpen: true, mode: "edit", partner });
  const closeModal = () => setModalState({ ...modalState, isOpen: false });

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to permanently delete this partner?")) return;

    setIsDeleting(id);
    try {
      await deletePartner(id);
      toast.success("Partner deleted successfully");
    } catch (error) {
      toast.error("Failed to delete partner");
    } finally {
      setIsDeleting(null);
    }
  }

  const columns: ColumnDef<Partner>[] = [
    {
      header: "Organization",
      cell: (partner) => <span className="font-bold">{partner.name}</span>,
    },
    {
      header: "Contact",
      cell: (partner) => (
        <>
          {partner.contact_person && (
            <div className="font-medium text-on-surface">{partner.contact_person}</div>
          )}
          {partner.email && <div className="text-xs">{partner.email}</div>}
          {partner.phone && <div className="text-xs">{partner.phone}</div>}
          {!partner.contact_person && !partner.email && !partner.phone && "-"}
        </>
      ),
    },
    {
      header: "Type",
      cell: (partner) => (
        <>
          {partner.partnership_type ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-surface-variant text-on-surface-variant">
              {partner.partnership_type}
            </span>
          ) : (
            "-"
          )}
        </>
      ),
    },
    {
      header: <div className="text-right">Actions</div>,
      cell: (partner) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => openEdit(partner)}
            className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-full transition-colors flex items-center justify-center"
            title="Edit Partner"
          >
            <span className="material-symbols-outlined text-lg">edit</span>
          </button>
          <button
            onClick={() => handleDelete(partner.id)}
            disabled={isDeleting === partner.id}
            className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/50 rounded-full transition-colors flex items-center justify-center disabled:opacity-50"
            title="Delete Partner"
          >
            <span className="material-symbols-outlined text-lg">delete</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-headline-lg font-bold text-on-surface">Partners</h1>
          <p className="text-on-surface-variant font-medium mt-1">
            Manage sponsors, NGOs, and other partners.
          </p>
        </div>
        <Button
          variant="default"
          className=" shadow-md flex items-center gap-2 hover:scale-105"
          onClick={openCreate}
        >
          <span className="material-symbols-outlined text-xl">handshake</span>
          Add Partner
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={partners}
        keyExtractor={(p) => p.id}
        emptyMessage='No partners found. Click "Add Partner" to create one.'
        count={count}
        page={page}
      />

      <PartnerFormModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        mode={modalState.mode}
        initialData={modalState.partner}
      />
    </>
  );
}
