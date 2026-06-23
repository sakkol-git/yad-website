import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";

const DOCUMENTS = [
  {
    year: "2025",
    title: "Annual Impact & Financial Report",
    status: "Published",
    size: "4.2 MB PDF",
  },
  {
    year: "2024",
    title: "Annual Impact & Financial Report",
    status: "Published",
    size: "3.8 MB PDF",
  },
  {
    year: "2023",
    title: "Third-Party Audit & Evaluation",
    status: "Published",
    size: "1.2 MB PDF",
  },
];

export function RadicalTransparency() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
        
        {/* Left: Editorial Manifesto */}
        <RevealOnScroll className="lg:col-span-5 lg:sticky lg:top-32">
          <span className="block text-primary uppercase tracking-[0.2em] font-label-bold text-xs mb-4">
            Accountability
          </span>
          <h2 className="font-headline-lg text-4xl lg:text-5xl text-primary mb-8 leading-tight tracking-tight">
            Radical <br className="hidden lg:block"/> Transparency
          </h2>
          <div className="space-y-6 font-body-lg text-on-surface-variant leading-relaxed">
            <p>
              Trust is the currency of systemic change. We are committed to an open-book policy, ensuring that our partners, donors, and the communities we serve have full visibility into our operations.
            </p>
            <p>
              Every year, we publish comprehensive breakdowns of our program expenditures alongside independent third-party audits.
            </p>
          </div>
        </RevealOnScroll>

        {/* Right: Document List */}
        <div className="lg:col-span-6 lg:col-start-7 flex flex-col">
          {DOCUMENTS.map((doc, index) => (
            <RevealOnScroll 
              key={doc.year + doc.title} 
              delay={index * 0.1}
              className="group border-t border-outline-variant/30 first:border-t-0 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer hover:bg-surface transition-colors -mx-6 px-6"
            >
              <div className="flex items-center gap-8">
                <span className="font-display-md text-3xl text-outline-variant/50 font-light">
                  {doc.year}
                </span>
                <div>
                  <h3 className="font-headline-sm text-xl text-on-surface mb-1 group-hover:text-primary transition-colors">
                    {doc.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs font-label-bold uppercase tracking-widest text-on-surface-variant/60">
                    <span>{doc.status}</span>
                    <span className="w-1 h-1 rounded-full bg-outline-variant/50" />
                    <span>{doc.size}</span>
                  </div>
                </div>
              </div>
              
              <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-outline-variant/30 group-hover:bg-primary group-hover:border-primary group-hover:text-on-primary transition-colors duration-200 ease-in-out">
                <span className="material-symbols-outlined">download</span>
              </div>
            </RevealOnScroll>
          ))}
          
          <RevealOnScroll delay={0.4} className="mt-8 pt-8 border-t border-outline-variant/30">
            <p className="text-sm font-label-bold text-on-surface-variant/60 uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">info</span>
              2026 Audit Currently Underway
            </p>
          </RevealOnScroll>
        </div>

      </div>
    </section>
  );
}
