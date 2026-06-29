"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FormInput } from "@/shared/components/ui/FormInput";
import { Button } from "@/shared/components/ui/Button";
import { quickFormSchema } from "@/server/validations/contact.schema";
import { submitQuickFormAction } from "@/server/actions/contact.actions";
import type { z } from "zod";

type ContactFormValues = z.infer<typeof quickFormSchema>;

export function ContactForm() {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(quickFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      interest: "" as any,
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    startTransition(async () => {
      try {
        const response = await submitQuickFormAction(data);
        if (!response.success) {
          toast.error(response.error || "Failed to send message.");
          return;
        }
        
        toast.success("Message sent successfully! We'll be in touch soon.");
        reset();
      } catch (error) {
        toast.error("Failed to send message. Please try again.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="uppercase tracking-widest text-[10px] font-bold text-on-surface">First Name <span className="text-primary">*</span></label>
          <FormInput 
            id="firstName" 
            {...register("firstName")}
            required 
            aria-required="true" 
            placeholder="John" 
            className="border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary h-12" 
          />
          {errors.firstName && <span className="text-error text-xs">{errors.firstName.message}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="uppercase tracking-widest text-[10px] font-bold text-on-surface">Last Name <span className="text-primary">*</span></label>
          <FormInput 
            id="lastName" 
            {...register("lastName")}
            required 
            aria-required="true" 
            placeholder="Doe" 
            className="border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary h-12" 
          />
          {errors.lastName && <span className="text-error text-xs">{errors.lastName.message}</span>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="uppercase tracking-widest text-[10px] font-bold text-on-surface">Email Address <span className="text-primary">*</span></label>
        <FormInput 
          type="email" 
          id="email" 
          {...register("email")}
          required 
          aria-required="true" 
          placeholder="john@example.com" 
          className="border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary h-12" 
        />
        {errors.email && <span className="text-error text-xs">{errors.email.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className="uppercase tracking-widest text-[10px] font-bold text-on-surface">Subject <span className="text-primary">*</span></label>
        <select 
          id="subject" 
          {...register("interest")}
          required
          aria-required="true"
          className="w-full bg-transparent border border-outline-variant/50 px-4 h-12 text-sm font-light text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors duration-150"
        >
          <option value="">Select a topic</option>
          <option value="partnership">Partnership Inquiry</option>
          <option value="volunteer">Volunteering</option>
          <option value="donation">Donations</option>
          <option value="media">Media & Press</option>
          <option value="other">Other</option>
        </select>
        {errors.interest && <span className="text-error text-xs">{errors.interest.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="uppercase tracking-widest text-[10px] font-bold text-on-surface">Message <span className="text-primary">*</span></label>
        <textarea 
          id="message" 
          {...register("message")}
          rows={5} 
          required
          aria-required="true"
          placeholder="How can we help you?"
          className="w-full bg-transparent border border-outline-variant/50 px-4 py-3 text-sm font-light text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors duration-150 resize-y"
        />
        {errors.message && <span className="text-error text-xs">{errors.message.message}</span>}
      </div>

      <Button type="submit" disabled={isPending} variant="default" size="lg" className="mt-4 bg-primary text-white hover:bg-primary/90 h-12 uppercase tracking-widest text-xs font-bold transition-colors duration-150 disabled:opacity-50">
        {isPending ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
