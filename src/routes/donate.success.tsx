import { createFileRoute } from "@tanstack/react-router";

const html = `<!-- Top Navigation suppressed for transactional/success screen as per instructions -->
<main class="flex-grow flex items-center justify-center p-gutter relative overflow-hidden">
<!-- Abstract Background Elements -->
<div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-fixed/20 blur-[100px] pointer-events-none"></div>
<div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-tertiary-fixed/20 blur-[120px] pointer-events-none"></div>
<div class="max-w-[600px] w-full bg-surface-container-lowest/80 backdrop-blur-md rounded-xl p-8 md:p-12 shadow-[0_8px_32px_rgba(65,104,55,0.05)] border border-surface-container/50 text-center relative z-10">
<!-- Icon -->
<div class="mb-8 flex justify-center animate-pop-in">
<div class="w-24 h-24 bg-secondary-container rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(191,236,174,0.4)]">
<span class="material-symbols-outlined text-[48px] text-secondary" style="font-variation-settings: 'FILL' 1;">check_circle</span>
</div>
</div>
<!-- Headlines -->
<h1 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4 animate-fade-up delay-100">
                Thank You for Your Impact!
            </h1>
<p class="font-body-lg text-body-lg text-on-surface-variant mb-10 animate-fade-up delay-200">
                Your contribution of <strong class="text-secondary">$50</strong> will provide safe housing and education support for a student in Cambodia.
            </p>
<!-- Actions -->
<div class="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-up delay-300">
<button class="bg-secondary text-on-secondary font-label-bold text-label-bold py-4 px-8 rounded-full hover:scale-[1.02] hover:shadow-[0_4px_12px_rgba(65,104,55,0.2)] transition-all duration-300 flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-[20px]">download</span>
                    Download Receipt
                </button>
<button class="bg-transparent text-primary border border-primary/20 font-label-bold text-label-bold py-4 px-8 rounded-full hover:bg-primary-fixed/10 transition-all duration-300">
                    Back to Homepage
                </button>
</div>
<!-- Social Share -->
<div class="pt-8 border-t border-surface-variant animate-fade-up delay-400">
<p class="font-label-bold text-label-bold text-on-surface-variant mb-4 uppercase tracking-wider">Share Your Impact</p>
<div class="flex justify-center gap-4">
<button aria-label="Share on Facebook" class="w-12 h-12 bg-surface-container flex items-center justify-center rounded-full text-on-surface hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors duration-300">
<span class="material-symbols-outlined">share</span>
</button>
<button aria-label="Share on Twitter" class="w-12 h-12 bg-surface-container flex items-center justify-center rounded-full text-on-surface hover:bg-tertiary-fixed hover:text-on-tertiary-fixed transition-colors duration-300">
<span class="material-symbols-outlined">chat_bubble</span>
</button>
<button aria-label="Copy Link" class="w-12 h-12 bg-surface-container flex items-center justify-center rounded-full text-on-surface hover:bg-secondary-container hover:text-on-secondary-container transition-colors duration-300">
<span class="material-symbols-outlined">link</span>
</button>
</div>
</div>
</div>
</main>
<!-- Footer suppressed for transactional/success screen to maintain focus -->`;

export const Route = createFileRoute("/donate/success")({
  head: () => ({ meta: [{ title: 'Thank You — YAD' }] }),
  component: Page,
});

function Page() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
