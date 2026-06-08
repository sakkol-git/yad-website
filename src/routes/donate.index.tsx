import { createFileRoute } from "@tanstack/react-router";

const html = `<!-- TopNavBar -->
<nav class="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm transition-all duration-300">
<div class="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
<div class="font-headline-md text-headline-md text-primary font-bold cursor-pointer transition-all hover:scale-105 duration-200">
                YAD Cambodia
            </div>
<div class="hidden md:flex gap-8 items-center">
<a class="text-on-surface-variant hover:text-primary font-body-md text-body-md cursor-pointer transition-all duration-200" href="/impact">Our Work</a>
<a class="text-on-surface-variant hover:text-primary font-body-md text-body-md cursor-pointer transition-all duration-200" href="#">Projects</a>
<a class="text-on-surface-variant hover:text-primary font-body-md text-body-md cursor-pointer transition-all duration-200" href="/impact">Impact</a>
<a class="text-on-surface-variant hover:text-primary font-body-md text-body-md cursor-pointer transition-all duration-200" href="#">About</a>
<a class="text-on-surface-variant hover:text-primary font-body-md text-body-md cursor-pointer transition-all duration-200" href="/get-involved">Contact</a>
</div>
<button class="hidden md:block bg-secondary text-on-secondary px-6 py-3 rounded-full font-label-bold text-label-bold hover:scale-105 transition-transform duration-200 shadow-sm">
                Donate Now
            </button>
<button class="md:hidden text-primary p-2">
<span class="material-symbols-outlined" data-icon="menu">menu</span>
</button>
</div>
</nav>
<!-- Hero Section -->
<header class="relative px-margin-mobile md:px-margin-desktop py-20 md:py-32 max-w-container-max mx-auto text-center soft-gradient rounded-xl mb-section-gap mx-4 md:mx-auto">
<h1 class="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-6 max-w-4xl mx-auto">
            Invest in Cambodia's Future Leaders
        </h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
            Your contribution directly funds safe housing, digital literacy, and community education for underprivileged youth.
        </p>
</header>
<!-- Main Content: Donation Segments -->
<main class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-section-gap">
<div class="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
<!-- Local Donations Card -->
<div class="bg-surface-container-lowest rounded-xl p-8 md:p-12 ambient-shadow flex flex-col items-center text-center">
<div class="w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center mb-6">
<span class="material-symbols-outlined text-on-secondary-container text-3xl" data-icon="qr_code_scanner">qr_code_scanner</span>
</div>
<h2 class="font-headline-md text-headline-md text-primary mb-4">Local Support</h2>
<p class="font-body-md text-body-md text-on-surface-variant mb-8">
                    Fast and secure donations via Bakong KHQR or direct bank transfer.
                </p>
<div class="bg-surface-container rounded-lg p-6 w-full max-w-xs mb-8 flex flex-col items-center justify-center aspect-square border border-outline-variant/30 relative overflow-hidden group">
<div class="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
<span class="material-symbols-outlined text-primary/30 text-6xl mb-2" data-icon="qr_code_2">qr_code_2</span>
<p class="text-sm text-on-surface-variant font-label-bold">KHQR Placeholder</p>
</div>
<p class="font-label-bold text-label-bold text-secondary mb-6">Scan to donate using any local banking app.</p>
<div class="w-full text-left bg-surface-container-low p-6 rounded-lg">
<h3 class="font-label-bold text-label-bold text-primary mb-4 border-b border-outline-variant/20 pb-2">Bank Details</h3>
<div class="space-y-4">
<div>
<p class="text-sm text-on-surface-variant">ABA Bank</p>
<p class="font-label-bold text-on-surface">000 123 456</p>
</div>
<div>
<p class="text-sm text-on-surface-variant">Acleda Bank</p>
<p class="font-label-bold text-on-surface">1234-5678-9012</p>
</div>
<div class="pt-2">
<p class="text-sm text-on-surface-variant">Account Name</p>
<p class="font-label-bold text-on-surface">YAD Organization</p>
</div>
</div>
</div>
</div>
<!-- International Donations Card -->
<div class="bg-surface-container-lowest rounded-xl p-8 md:p-12 ambient-shadow flex flex-col">
<div class="flex items-center gap-4 mb-6">
<div class="w-16 h-16 bg-tertiary-fixed rounded-full flex items-center justify-center">
<span class="material-symbols-outlined text-on-tertiary-fixed text-3xl" data-icon="public">public</span>
</div>
<div>
<h2 class="font-headline-md text-headline-md text-primary">Global Giving</h2>
<p class="font-body-md text-body-md text-on-surface-variant">Secure card payments via Stripe.</p>
</div>
</div>
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
<button class="py-3 rounded-lg border-2 border-outline-variant text-on-surface-variant font-label-bold hover:border-secondary hover:text-secondary transition-colors focus:border-secondary focus:bg-secondary/5 focus:text-secondary outline-none">
                        $25
                    </button>
<button class="py-3 rounded-lg border-2 border-secondary bg-secondary/5 text-secondary font-label-bold transition-colors outline-none relative overflow-hidden">
<div class="absolute top-0 right-0 w-3 h-3 bg-secondary rounded-bl-sm"></div>
                        $50
                    </button>
<button class="py-3 rounded-lg border-2 border-outline-variant text-on-surface-variant font-label-bold hover:border-secondary hover:text-secondary transition-colors focus:border-secondary focus:bg-secondary/5 focus:text-secondary outline-none">
                        $100
                    </button>
<button class="py-3 rounded-lg border-2 border-outline-variant text-on-surface-variant font-label-bold hover:border-secondary hover:text-secondary transition-colors focus:border-secondary focus:bg-secondary/5 focus:text-secondary outline-none">
                        Custom
                    </button>
</div>
<div class="space-y-4 flex-grow">
<div>
<label class="block text-sm font-label-bold text-on-surface mb-1">Full Name</label>
<input class="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-secondary transition-all" placeholder="Jane Doe" type="text"/>
</div>
<div>
<label class="block text-sm font-label-bold text-on-surface mb-1">Email Address</label>
<input class="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-secondary transition-all" placeholder="jane@example.com" type="email"/>
</div>
</div>
<div class="mt-8">
<button class="w-full bg-secondary text-on-secondary py-4 rounded-full font-label-bold text-lg hover:scale-[1.02] transition-transform duration-200 shadow-md flex justify-center items-center gap-2">
<span class="material-symbols-outlined" data-icon="credit_card">credit_card</span>
                        Donate $50
                    </button>
<div class="flex justify-center items-center gap-4 mt-6 text-on-surface-variant opacity-60">
<span class="material-symbols-outlined text-3xl" data-icon="lock">lock</span>
<span class="text-sm font-label-bold">Secured by Stripe</span>
</div>
</div>
</div>
</div>
</main>
<!-- Transparency & Impact Section -->
<section class="bg-surface-container-low py-section-gap rounded-t-[3rem]">
<div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
<h2 class="font-headline-md text-headline-md text-primary mb-12">Your Impact</h2>
<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
<div class="bg-surface-container-lowest p-8 rounded-xl ambient-shadow hover:-translate-y-2 transition-transform duration-300">
<div class="text-secondary font-headline-lg text-headline-lg mb-2">$25</div>
<p class="font-body-md text-body-md text-on-surface">Provides school supplies for one student for a semester.</p>
</div>
<div class="bg-surface-container-lowest p-8 rounded-xl ambient-shadow hover:-translate-y-2 transition-transform duration-300 relative border-2 border-secondary/20">
<div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-on-secondary px-4 py-1 rounded-full text-xs font-label-bold">Most Common</div>
<div class="text-secondary font-headline-lg text-headline-lg mb-2">$50</div>
<p class="font-body-md text-body-md text-on-surface">Funds 1 month of safe housing and utilities for a student.</p>
</div>
<div class="bg-surface-container-lowest p-8 rounded-xl ambient-shadow hover:-translate-y-2 transition-transform duration-300">
<div class="text-secondary font-headline-lg text-headline-lg mb-2">$100</div>
<p class="font-body-md text-body-md text-on-surface">Supports a complete digital literacy course enrollment.</p>
</div>
</div>
<a class="inline-flex items-center gap-2 text-primary hover:text-secondary font-label-bold transition-colors pb-1 border-b-2 border-primary/20 hover:border-secondary" href="#">
                View Annual Reports for Financial Transparency
                <span class="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
</a>
</div>
</section>
<!-- Footer -->
<footer class="w-full py-section-gap bg-surface-container-lowest transition-all duration-300">
<div class="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop gap-gutter max-w-container-max mx-auto">
<div class="font-headline-md text-headline-md text-primary mb-6 md:mb-0">
                YAD Cambodia
            </div>
<div class="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
<a class="text-on-surface-variant font-body-md text-body-md hover:text-primary transition-colors" href="#">Privacy Policy</a>
<a class="text-on-surface-variant font-body-md text-body-md hover:text-primary transition-colors" href="#">Terms of Service</a>
<a class="text-on-surface-variant font-body-md text-body-md hover:text-primary transition-colors" href="#">Financial Transparency</a>
<a class="text-on-surface-variant font-body-md text-body-md hover:text-primary transition-colors" href="#">Bakong QR Guide</a>
</div>
<div class="text-on-surface text-center md:text-right font-body-md text-body-md text-sm opacity-70">
                © 2024 Youth Advancement for Development (YAD). All rights reserved. Registered NGO in Cambodia.
            </div>
</div>
</footer>`;

export const Route = createFileRoute("/donate/")({
  head: () => ({ meta: [{ title: 'Donate — YAD' }] }),
  component: Page,
});

function Page() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
