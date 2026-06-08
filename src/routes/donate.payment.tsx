import { createFileRoute } from "@tanstack/react-router";

const html = `<!-- Minimal Header for Transactional Flow (Navigation Suppressed) -->
<header class="w-full py-6 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest border-b border-surface-variant flex justify-between items-center z-50">
<div class="flex items-center gap-2 text-primary font-headline-md text-headline-md">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">eco</span>
<span>YAD Cambodia</span>
</div>
<a class="text-on-surface-variant hover:text-primary font-label-bold text-label-bold flex items-center gap-1 transition-colors" href="#">
<span class="material-symbols-outlined text-sm">arrow_back</span>
            Return to site
        </a>
</header>
<main class="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-20 flex flex-col lg:flex-row gap-gutter">
<!-- Left Column: Checkout Flow -->
<div class="w-full lg:w-2/3">
<!-- Progress Indicator -->
<div class="flex items-center gap-4 mb-8"><div class="flex items-center gap-2"><div class="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-bold text-label-bold"><span class="material-symbols-outlined text-sm">check</span></div><span class="font-label-bold text-label-bold text-secondary hidden md:inline">Details</span></div><div class="h-px bg-surface-variant flex-grow"></div><div class="flex items-center gap-2"><div class="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-bold text-label-bold">2</div><span class="font-label-bold text-label-bold text-primary hidden md:inline">Payment</span></div><div class="h-px bg-surface-variant flex-grow"></div><div class="flex items-center gap-2"><div class="w-8 h-8 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-label-bold text-label-bold">3</div><span class="font-label-bold text-label-bold text-on-surface-variant hidden md:inline">Review</span></div></div>
<div class="bg-surface-container-lowest rounded-xl ambient-shadow p-6 md:p-10 relative overflow-hidden">
<!-- Global Error Banner -->
<div class="hidden mb-6 bg-error-container text-on-error-container p-4 rounded-lg flex items-start gap-3" id="global-error">
<span class="material-symbols-outlined text-error mt-0.5">error</span>
<div>
<p class="font-label-bold text-label-bold text-error">Payment Declined</p>
<p class="font-body-md text-body-md text-sm mt-1">Your card was declined. Please try a different payment method or contact your bank.</p>
</div>
</div>
<!-- STEP 1: Amount & Contact -->
<div class="" id="step-1"><h2 class="font-headline-md text-headline-md text-primary mb-6">Payment Method</h2><div class="bg-surface p-6 rounded-lg border border-surface-variant mb-8"><div class="mb-6"><label class="block font-label-bold text-label-bold text-on-surface mb-2">Card Information</label><div class="relative"><span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">credit_card</span><input class="stripe-input pl-10 border border-surface-variant bg-surface-container-lowest mb-[-1px] rounded-b-none" placeholder="Card number" required="" type="text"/></div><div class="grid grid-cols-2"><input class="stripe-input border border-surface-variant bg-surface-container-lowest rounded-t-none rounded-br-none border-r-0" placeholder="MM / YY" required="" type="text"/><input class="stripe-input border border-surface-variant bg-surface-container-lowest rounded-t-none rounded-bl-none" placeholder="CVC" required="" type="text"/></div></div><div class="mb-6"><label class="block font-label-bold text-label-bold text-on-surface mb-2">Name on Card</label><input class="stripe-input border border-surface-variant bg-surface-container-lowest" placeholder="Jane Doe" required="" type="text"/></div><div class="pt-4 border-t border-surface-variant"><h3 class="font-label-bold text-label-bold text-on-surface mb-4">Billing Address</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-xs font-label-bold text-on-surface-variant mb-1">Country</label><select class="stripe-input border border-surface-variant bg-surface-container-lowest"><option>United States</option><option>Cambodia</option></select></div><div><label class="block text-xs font-label-bold text-on-surface-variant mb-1">ZIP / Postal Code</label><input class="stripe-input border border-surface-variant bg-surface-container-lowest" placeholder="12345" required="" type="text"/></div></div></div></div><div class="flex justify-between items-center"><button class="text-on-surface-variant font-label-bold text-label-bold py-3 px-4 hover:text-primary transition-colors flex items-center gap-1" type="button"><span class="material-symbols-outlined text-sm">arrow_back</span> Back</button><button class="bg-primary text-on-primary font-label-bold text-label-bold py-3 px-8 rounded-full hover:scale-105 transition-transform flex items-center gap-2" type="button">Review Donation <span class="material-symbols-outlined">arrow_forward</span></button></div></div>
<!-- STEP 2: Payment Details -->
<div class="step-hidden" id="step-2">
<h2 class="font-headline-md text-headline-md text-primary mb-6">Payment Details</h2>
<p class="font-body-md text-body-md text-on-surface-variant mb-6">All transactions are secure and encrypted.</p>
<!-- Simulated Stripe Element Container -->
<div class="bg-surface p-6 rounded-lg border border-surface-variant mb-8">
<div class="mb-4">
<label class="block font-label-bold text-label-bold text-on-surface mb-2">Card Information</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">credit_card</span>
<input class="stripe-input pl-10 border border-surface-variant bg-surface-container-lowest mb-[-1px] rounded-b-none" placeholder="Card number" required="" type="text"/>
</div>
<div class="grid grid-cols-2">
<input class="stripe-input border border-surface-variant bg-surface-container-lowest rounded-t-none rounded-br-none border-r-0" placeholder="MM / YY" required="" type="text"/>
<input class="stripe-input border border-surface-variant bg-surface-container-lowest rounded-t-none rounded-bl-none" placeholder="CVC" required="" type="text"/>
</div>
</div>
<div>
<label class="block font-label-bold text-label-bold text-on-surface mb-2">Name on card</label>
<input class="stripe-input border border-surface-variant bg-surface-container-lowest" placeholder="Jane Doe" required="" type="text"/>
</div>
</div>
<div class="flex justify-between items-center">
<button class="text-on-surface-variant font-label-bold text-label-bold py-3 px-4 hover:text-primary transition-colors flex items-center gap-1" onclick="goToStep(1)" type="button">
<span class="material-symbols-outlined text-sm">arrow_back</span> Back
                        </button>
<button class="bg-secondary text-on-secondary font-label-bold text-label-bold py-3 px-8 rounded-full hover:scale-105 transition-transform" onclick="goToStep(3)" type="button">
                            Review Donation
                        </button>
</div>
</div>
<!-- STEP 3: Review -->
<div class="step-hidden" id="step-3">
<h2 class="font-headline-md text-headline-md text-primary mb-6">Review &amp; Confirm</h2>
<div class="bg-surface-container-low rounded-lg p-6 mb-8 border border-surface-variant">
<div class="flex justify-between items-center mb-4 pb-4 border-b border-surface-variant">
<span class="font-body-md text-body-md text-on-surface-variant">Donation Amount</span>
<span class="font-headline-md text-headline-md text-primary" id="review-amount">$50.00</span>
</div>
<div class="flex justify-between items-center mb-2">
<span class="font-body-md text-body-md text-on-surface-variant">Frequency</span>
<span class="font-label-bold text-label-bold text-on-surface">One-time</span>
</div>
<div class="flex justify-between items-center">
<span class="font-body-md text-body-md text-on-surface-variant">Payment Method</span>
<span class="font-label-bold text-label-bold text-on-surface flex items-center gap-1">
<span class="material-symbols-outlined text-sm">credit_card</span> •••• 4242
                            </span>
</div>
</div>
<div class="flex justify-between items-center mt-8">
<button class="text-on-surface-variant font-label-bold text-label-bold py-3 px-4 hover:text-primary transition-colors flex items-center gap-1" onclick="goToStep(2)" type="button">
<span class="material-symbols-outlined text-sm">arrow_back</span> Edit
                        </button>
<div class="flex gap-2">
<!-- Dev note: Button to trigger error state purely for demonstration -->
<button class="bg-surface-variant text-on-surface-variant font-label-bold text-label-bold py-3 px-4 rounded-full hover:bg-error-container hover:text-error transition-colors text-sm" onclick="submitDonation(false)" type="button">
                                Sim Error
                            </button>
<button class="bg-primary text-on-primary font-label-bold text-label-bold py-3 px-8 rounded-full hover:scale-105 transition-transform flex items-center gap-2" id="submit-btn" onclick="submitDonation(true)" type="button">
<span class="material-symbols-outlined">lock</span> Complete Donation
                            </button>
</div>
</div>
</div>
<!-- SUCCESS STATE -->
<div class="step-hidden text-center py-10" id="step-success">
<div class="w-20 h-20 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mx-auto mb-6">
<span class="material-symbols-outlined text-4xl" style="font-variation-settings: 'FILL' 1;">check_circle</span>
</div>
<h2 class="font-headline-lg text-headline-lg text-primary mb-4">Thank You!</h2>
<p class="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-md mx-auto">Your generous donation has been processed successfully. A receipt has been sent to your email.</p>
<div class="bg-surface-container rounded-lg p-6 max-w-sm mx-auto mb-8 text-left">
<p class="font-label-bold text-label-bold text-on-surface mb-2">Transaction Details</p>
<div class="flex justify-between text-sm text-on-surface-variant mb-1"><span>Amount:</span> <span class="font-bold text-on-surface" id="success-amount">$50.00</span></div>
<div class="flex justify-between text-sm text-on-surface-variant"><span>ID:</span> <span>ch_1MxxxxxYADxxxx</span></div>
</div>
<a class="inline-block bg-surface-container hover:bg-surface-variant text-on-surface font-label-bold text-label-bold py-3 px-8 rounded-full transition-colors" href="#">
                        Return to Homepage
                    </a>
</div>
</div>
</div>
<!-- Right Column: Summary & Trust Signals -->
<div class="w-full lg:w-1/3 mt-8 lg:mt-0">
<div class="sticky top-24 bg-surface-container-low rounded-xl p-8 border border-surface-variant relative overflow-hidden">
<!-- Decorative background image for 'Organic Growth' feel -->
<div class="absolute top-0 right-0 w-32 h-32 bg-secondary-fixed opacity-20 rounded-bl-full -z-0"></div>
<h3 class="font-headline-md text-headline-md text-primary mb-6 relative z-10">Summary</h3>
<div class="flex justify-between items-end mb-6 border-b border-surface-variant pb-6 relative z-10">
<span class="font-body-lg text-body-lg text-on-surface-variant">Total</span>
<span class="font-display-lg text-display-lg text-primary" id="summary-amount">$50</span>
</div>
<div class="space-y-4 relative z-10">
<div class="flex items-start gap-3">
<span class="material-symbols-outlined text-secondary">verified_user</span>
<div>
<p class="font-label-bold text-label-bold text-on-surface">Secure Checkout</p>
<p class="font-body-md text-body-md text-sm text-on-surface-variant">Guaranteed safe &amp; encrypted by Stripe.</p>
</div>
</div>
<div class="flex items-start gap-3">
<span class="material-symbols-outlined text-secondary">favorite</span>
<div>
<p class="font-label-bold text-label-bold text-on-surface">Direct Impact</p>
<p class="font-body-md text-body-md text-sm text-on-surface-variant">100% of your donation funds local projects in Cambodia.</p>
</div>
</div>
</div>
<div class="mt-8 pt-6 border-t border-surface-variant flex items-center justify-center gap-2 text-on-surface-variant opacity-70 relative z-10">
<span class="font-label-bold text-label-bold text-xs uppercase tracking-wider">Powered by</span>
<!-- Simulated Stripe Logo text -->
<span class="font-bold text-lg tracking-tighter text-[#635BFF]">stripe</span>
</div>
</div>
</div>
</main>
<!-- Minimal Footer -->
<footer class="w-full py-8 text-center bg-surface-container-lowest border-t border-surface-variant text-on-surface-variant font-body-md text-body-md text-sm">
<p>© 2024 Youth Advancement for Development (YAD). All rights reserved.</p>
<div class="flex justify-center gap-4 mt-2">
<a class="hover:text-primary transition-colors" href="#">Privacy</a>
<a class="hover:text-primary transition-colors" href="#">Terms</a>
<a class="hover:text-primary transition-colors" href="/get-involved">Contact</a>
</div>
</footer>`;

export const Route = createFileRoute("/donate/payment")({
  head: () => ({ meta: [{ title: 'Payment — YAD' }] }),
  component: Page,
});

function Page() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
