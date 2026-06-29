"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/Button";
import { FormInput } from "@/shared/components/ui/FormInput";
import { FormSelect } from "@/shared/components/ui/FormSelect";
import { FormTextarea } from "@/shared/components/ui/FormTextarea";
import { FormField } from "@/shared/components/admin/forms/FormField";
import { createProgramAction, updateProgramAction, ProgramFormData } from "@/server/actions/program.actions";
import { z } from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/Dialog';

const programSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["active", "completed", "upcoming"]),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().optional(),
  beneficiaries_count: z.number().min(0, "Must be positive"),
  image_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export function ProgramFormModal({
  initialData,
  onClose,
  onSuccess
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData: any;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState<Partial<ProgramFormData>>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    category: initialData?.category || "",
    status: initialData?.status || "upcoming",
    start_date: initialData?.start_date?.split("T")[0] || "",
    end_date: initialData?.end_date?.split("T")[0] || "",
    beneficiaries_count: initialData?.beneficiaries_count || 0,
    image_url: initialData?.image_url || "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const parsed = programSchema.parse({
        ...formData,
        beneficiaries_count: Number(formData.beneficiaries_count),
      });

      const dataToSubmit = {
        ...parsed,
        end_date: parsed.end_date || null,
        image_url: parsed.image_url || null,
      };

      let result;
      if (initialData?.id) {
        result = await updateProgramAction({ id: initialData.id, data: dataToSubmit as ProgramFormData });
      } else {
        result = await createProgramAction(dataToSubmit as ProgramFormData);
      }

      if (result.success) {
        toast.success(initialData?.id ? "Program updated successfully" : "Program created successfully");
        onSuccess();
      } else {
        toast.error(result.error || "Failed to save program");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b border-surface-variant/30 sticky top-0 bg-surface z-10">
          <DialogTitle className="text-xl font-headline-md font-bold text-on-surface">
            {initialData ? "Edit Program" : "Add Program"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
          <FormField label="Title" required error={errors.title}>
            <FormInput
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              placeholder="Program Title"
              icon="title"
            />
          </FormField>

          <FormField label="Description" required error={errors.description}>
            <FormTextarea
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Program Description"
              rows={4}
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Category" required error={errors.category}>
              <FormInput
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                placeholder="e.g. Education, Health"
                icon="category"
              />
            </FormField>

            <FormField label="Status" required error={errors.status}>
              <FormSelect
                value={formData.status}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={e => setFormData({...formData, status: e.target.value as any})}
              >
                <option value="upcoming">Upcoming</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </FormSelect>
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Start Date" required error={errors.start_date}>
              <FormInput
                type="date"
                value={formData.start_date}
                onChange={e => setFormData({...formData, start_date: e.target.value})}
              />
            </FormField>

            <FormField label="End Date" error={errors.end_date}>
              <FormInput
                type="date"
                value={formData.end_date || ""}
                onChange={e => setFormData({...formData, end_date: e.target.value})}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Beneficiaries Count" error={errors.beneficiaries_count}>
              <FormInput
                type="number"
                min="0"
                value={formData.beneficiaries_count}
                onChange={e => setFormData({...formData, beneficiaries_count: parseInt(e.target.value) || 0})}
                icon="groups"
              />
            </FormField>

            <FormField label="Image URL" error={errors.image_url}>
              <FormInput
                type="url"
                value={formData.image_url || ""}
                onChange={e => setFormData({...formData, image_url: e.target.value})}
                placeholder="https://..."
                icon="link"
              />
            </FormField>
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-surface-variant/30 sticky bottom-0 bg-surface z-10">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" variant="default" disabled={isLoading} className="min-w-[120px]">
              {isLoading ? "Saving..." : "Save Program"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
