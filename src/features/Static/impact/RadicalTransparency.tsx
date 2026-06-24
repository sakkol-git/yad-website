import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { Database } from "@/shared/types/supabase";

type Report = Database["public"]["Tables"]["annual_reports"]["Row"];

/** Format file size bytes to a display string, e.g. "4.2 MB PDF" */
function formatFileSize(bytes: number | null | undefined): string {
  if (!bytes || bytes === 0) return "PDF";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB PDF`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB PDF`;
}

interface RadicalTransparencyProps {
  reports: Report[];
}

export function RadicalTransparency({ reports }: RadicalTransparencyProps) {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">

        {/* Left: Editorial Manifesto */}
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <RevealOnScroll>
            <span className="block text-primary uppercase tracking-[0.2em] font-label-bold text-xs mb-4">
              Accountability
            </span>
          </RevealOnScroll>
          <TextReveal
            as="h2"
            text="Radical Transparency"
            className="font-headline-lg text-4xl lg:text-5xl text-primary mb-8 leading-tight tracking-tight"
          />
          <RevealOnScroll delay={0.1}>
            <div className="space-y-6 font-body-lg text-on-surface-variant leading-relaxed">
              <p>
                Trust is the currency of systemic change. We are committed to an
                open-book policy, ensuring that our partners, donors, and the
                communities we serve have full visibility into our operations.
              </p>
              <p>
                Every year, we publish comprehensive breakdowns of our program
                expenditures alongside independent third-party audits.
              </p>
            </div>
          </RevealOnScroll>
        </div>

        {/* Right: Document List */}
        <div className="lg:col-span-6 lg:col-start-7 flex flex-col">
          {reports.length === 0 ? (
            <RevealOnScroll className="py-12 text-on-surface-variant/60 text-sm italic border-t border-outline-variant/30">
              No reports have been published yet. Check back soon.
            </RevealOnScroll>
          ) : (
            reports.map((doc, index) => (
              <RevealOnScroll
                key={doc.id}
                delay={index * 0.1}
                className="group border-t border-outline-variant/30 first:border-t-0 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 -mx-6 px-6 hover:bg-surface transition-colors"
              >
                <a
                  href={doc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-8 flex-1 min-w-0"
                  aria-label={`Download ${doc.title} (${doc.year})`}
                >
                  <span className="font-display-md text-3xl text-outline-variant/50 font-light shrink-0">
                    {doc.year}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-headline-sm text-xl text-on-surface mb-1 group-hover:text-primary transition-colors truncate">
                      {doc.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs font-label-bold uppercase tracking-widest text-on-surface-variant/60">
                      <span>Published</span>
                      <span className="w-1 h-1 rounded-md-full bg-outline-variant/50 shrink-0" />
                      <span>{formatFileSize(doc.file_size_bytes)}</span>
                    </div>
                  </div>
                </a>

                <a
                  href={doc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Download ${doc.title}`}
                  className="hidden md:flex items-center justify-center w-12 h-12 rounded-md-full border border-outline-variant/30 group-hover:bg-primary group-hover:border-primary group-hover:text-on-primary transition-colors duration-200 ease-in-out shrink-0"
                >
                  <span className="material-symbols-outlined">download</span>
                </a>
              </RevealOnScroll>
            ))
          )}

          <RevealOnScroll
            delay={0.4}
            className="mt-8 pt-8 border-t border-outline-variant/30"
          >
            <p className="text-sm font-label-bold text-on-surface-variant/60 uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">info</span>
              Audits are conducted annually by independent third parties
            </p>
          </RevealOnScroll>
        </div>

      </div>
    </section>
  );
}
