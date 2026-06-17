"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/Button";
import { FormInput } from "@/shared/components/ui/FormInput";
import { createProgramAction, updateProgramAction, ProgramFormData } from "@/server/actions/program.actions";
import { z } from "zod";
import { toast } from "sonner";

const programSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["active", "completed", "upcoming"]),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().optional(),
  beneficiaries_count: z.number().min(0, "Must be positive"),
  image_url: z.string().url().optional().or(z.literal("")),
});

export function ProgramFormModal({
  initialData,
  onClose,
  onSuccess
}: {
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
        end_date: parsed.end_date || null, // convert empty string to null
        image_url: parsed.image_url || null,
      };

      let result;
      if (initialData?.id) {
        result = await updateProgramAction(initialData.id, dataToSubmit as ProgramFormData);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-surface w-full max-w-2xl rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-surface border-b border-surface-variant p-6 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-on-surface">
            {initialData ? "Edit Program" : "Add Program"}
          </h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-on-surface mb-1">Title *</label>
              <FormInput
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Program Title"
                className={errors.title ? "border-error" : ""}
              />
              {errors.title && <p className="text-error text-xs mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-on-surface mb-1">Description *</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className={`w-full px-4 py-3 rounded-lg border bg-surface-container-lowest text-on-surface transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${errors.description ? "border-error" : "border-outline-variant"}`}
                rows={4}
                placeholder="Program Description"
              />
              {errors.description && <p className="text-error text-xs mt-1">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-on-surface mb-1">Category *</label>
                <FormInput
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  placeholder="e.g. Education, Health"
                  className={errors.category ? "border-error" : ""}
                />
                {errors.category && <p className="text-error text-xs mt-1">{errors.category}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-on-surface mb-1">Status *</label>
                <select
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value as any})}
                  className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-on-surface mb-1">Start Date *</label>
                <FormInput
                  type="date"
                  value={formData.start_date}
                  onChange={e => setFormData({...formData, start_date: e.target.value})}
                  className={errors.start_date ? "border-error" : ""}
                />
                {errors.start_date && <p className="text-error text-xs mt-1">{errors.start_date}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-on-surface mb-1">End Date</label>
                <FormInput
                  type="date"
                  value={formData.end_date || ""}
                  onChange={e => setFormData({...formData, end_date: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-on-surface mb-1">Beneficiaries Count</label>
                <FormInput
                  type="number"
                  min="0"
                  value={formData.beneficiaries_count}
                  onChange={e => setFormData({...formData, beneficiaries_count: parseInt(e.target.value) || 0})}
                  className={errors.beneficiaries_count ? "border-error" : ""}
                />
                {errors.beneficiaries_count && <p className="text-error text-xs mt-1">{errors.beneficiaries_count}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-on-surface mb-1">Image URL</label>
                <FormInput
                  type="url"
                  value={formData.image_url || ""}
                  onChange={e => setFormData({...formData, image_url: e.target.value})}
                  placeholder="https://..."
                  className={errors.image_url ? "border-error" : ""}
                />
                {errors.image_url && <p className="text-error text-xs mt-1">{errors.image_url}</p>}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-surface-variant">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Program"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
