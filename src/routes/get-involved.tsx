import { createFileRoute } from "@tanstack/react-router";

const html = `<!-- TopNavBar Shared Component -->
<nav class="fixed top-0 w-full z-50 bg-surface/60 dark:bg-surface-dim/60 backdrop-blur-md glass-nav border-b-0">
<div class="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-6 max-w-container-max mx-auto">
<a class="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed flex items-center gap-2 hover:scale-105 transition-transform duration-200" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">eco</span>
                YAD
            </a>
<div class="hidden md:flex gap-8 items-center">
<a class="text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="/">Home</a>
<a class="text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="/about">About Us</a>
<a class="text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="/programs">Features</a>
<a class="text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="/impact">Our Work</a>
<a class="text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="/get-involved">Contact</a>
</div>
<div class="hidden md:flex items-center gap-4">
<button class="bg-secondary text-on-secondary font-label-bold text-label-bold px-6 py-3 rounded-full hover:scale-105 transition-transform duration-200 shadow-md">Join Us</button>
<button class="bg-tertiary-fixed text-on-tertiary-fixed font-label-bold text-label-bold px-6 py-3 rounded-full hover:scale-105 transition-transform duration-200 shadow-md">Donate</button>
</div>
<!-- Mobile Menu Toggle -->
<button class="md:hidden text-primary">
<span class="material-symbols-outlined text-3xl">menu</span>
</button>
</div>
</nav>
<!-- Hero Section -->
<header class="relative pt-32 pb-24 md:pt-48 md:pb-32 px-margin-mobile md:px-margin-desktop min-h-[819px] flex items-center overflow-hidden">
<!-- Abstract Background Shape -->
<div class="absolute right-0 top-0 w-[600px] h-[600px] bg-secondary-container/30 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/4"></div>
<div class="absolute left-0 bottom-0 w-[800px] h-[800px] bg-tertiary-fixed/20 rounded-full blur-3xl -z-10 -translate-x-1/4 translate-y-1/4"></div>
<div class="max-w-container-max mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
<div class="max-w-2xl relative z-10">
<h1 class="font-display-lg text-display-lg text-primary mb-6 leading-tight">
                    Small Actions,<br/>
<span class="text-secondary">Big Impact</span>
</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-lg">
                    Join YAD in empowering youth for sustainable development. Whether you want to fund the future, mentor the next generation, or build a partnership, your involvement creates waves of positive change.
                </p>
<div class="flex flex-wrap gap-4">
<a class="bg-secondary-container text-on-secondary-container font-label-bold text-label-bold px-8 py-4 rounded-full hover:bg-secondary hover:text-on-secondary transition-colors duration-300 shadow-sm hover:shadow-md inline-flex items-center gap-2" href="#pathways">
                        Get Involved Today
                        <span class="material-symbols-outlined text-sm">arrow_downward</span>
</a>
</div>
</div>
<!-- Hero Image / Visual Anchor -->
<div class="relative w-full aspect-square md:aspect-auto md:h-[600px] rounded-[3rem] overflow-hidden ambient-shadow bg-surface-container-highest">
<img alt="Floating green island" class="w-full h-full object-cover object-center absolute inset-0" data-alt="A lush, futuristic green island floating in the sky with waterfalls cascading down its edges. The island is covered in vibrant green foliage, small wooden cabins, and clear winding rivers. The scene is bright, optimistic, and highly detailed, representing sustainable utopia. The color palette emphasizes rich greens, light blues, and soft whites, fitting a modern, hopeful ecological aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnyxH32U9MRIGnj1UOoT8q6NstDsgfB3uNB0YLWkcn-CD3WufeGDmy4ZatMIs3cnK_pN_hxobe8Q1IkDrmYL5iCHh1cJV0XxpMAE1TB_BnuXUdYhHW4mv98lE1Aic8A9lXj0j34eDkMHzGRa4b_AGE3KJgtK3ZkwMGryaa8JpMsPaTF5rY5C5Ww7DQSskk4Q9zoWBEtGaZaF25JOrrP0sF6dvMm0G6vHjuPoAmeDIcQmaMKOZKxr55in9rLChDeE5DScsWo_3zQGg"/>
<!-- Subtle gradient overlay to ensure text contrast if placed over it, though here it's beside -->
<div class="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
</div>
</div>
</header>
<!-- Pathways Section (Bento Grid) -->
<section class="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-low/50" id="pathways">
<div class="max-w-container-max mx-auto">
<div class="text-center max-w-2xl mx-auto mb-16">
<span class="text-secondary font-label-bold text-label-bold tracking-wider uppercase mb-2 block">Take Action</span>
<h2 class="font-headline-lg text-headline-lg md:text-headline-lg text-primary">Choose Your Impact Path</h2>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
<!-- Pathway 1: Fund -->
<div class="bg-surface rounded-xl p-8 ambient-shadow hover-lift flex flex-col group relative overflow-hidden">
<div class="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center mb-6 text-on-secondary-container transition-transform group-hover:scale-110">
<span class="material-symbols-outlined text-3xl">volunteer_activism</span>
</div>
<h3 class="font-headline-md text-headline-md text-primary mb-3">Fund the Future</h3>
<p class="font-body-md text-body-md text-on-surface-variant mb-8 flex-grow">
                        Your financial support directly fuels youth-led ecological projects, workshops, and community infrastructure.
                    </p>
<a class="text-secondary font-label-bold text-label-bold flex items-center gap-2 group-hover:gap-3 transition-all" href="#donate">
                        Make a Donation <span class="material-symbols-outlined text-sm">arrow_forward</span>
</a>
<div class="absolute -right-4 -bottom-4 w-32 h-32 bg-secondary/5 rounded-full blur-2xl -z-10 group-hover:bg-secondary/10 transition-colors"></div>
</div>
<!-- Pathway 2: Mentor -->
<div class="bg-surface rounded-xl p-8 ambient-shadow hover-lift flex flex-col group relative overflow-hidden md:-translate-y-4">
<div class="w-16 h-16 rounded-full bg-tertiary-fixed flex items-center justify-center mb-6 text-on-tertiary-fixed transition-transform group-hover:scale-110">
<span class="material-symbols-outlined text-3xl">school</span>
</div>
<h3 class="font-headline-md text-headline-md text-primary mb-3">Mentor &amp; Teach</h3>
<p class="font-body-md text-body-md text-on-surface-variant mb-8 flex-grow">
                        Share your expertise. We need passionate individuals to lead workshops on sustainability, tech, and leadership.
                    </p>
<a class="text-tertiary font-label-bold text-label-bold flex items-center gap-2 group-hover:gap-3 transition-all" href="#volunteer">
                        Apply to Mentor <span class="material-symbols-outlined text-sm">arrow_forward</span>
</a>
<div class="absolute -right-4 -bottom-4 w-32 h-32 bg-tertiary/5 rounded-full blur-2xl -z-10 group-hover:bg-tertiary/10 transition-colors"></div>
</div>
<!-- Pathway 3: Partner -->
<div class="bg-surface rounded-xl p-8 ambient-shadow hover-lift flex flex-col group relative overflow-hidden">
<div class="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-6 text-on-primary-fixed transition-transform group-hover:scale-110">
<span class="material-symbols-outlined text-3xl">handshake</span>
</div>
<h3 class="font-headline-md text-headline-md text-primary mb-3">Institutional Partnerships</h3>
<p class="font-body-md text-body-md text-on-surface-variant mb-8 flex-grow">
                        Align your organization with our mission. We collaborate with schools, corporations, and NGOs to scale our impact.
                    </p>
<a class="text-primary font-label-bold text-label-bold flex items-center gap-2 group-hover:gap-3 transition-all" href="#partner">
                        Partner With Us <span class="material-symbols-outlined text-sm">arrow_forward</span>
</a>
<div class="absolute -right-4 -bottom-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl -z-10 group-hover:bg-primary/10 transition-colors"></div>
</div>
</div>
</div>
</section>
<!-- Quick Form Section -->
<section class="py-section-gap px-margin-mobile md:px-margin-desktop">
<div class="max-w-4xl mx-auto bg-surface-container-lowest rounded-[2rem] p-8 md:p-12 ambient-shadow relative overflow-hidden border border-outline-variant/30">
<!-- Decorative corner elements -->
<div class="absolute top-0 right-0 w-64 h-64 bg-secondary-container/20 rounded-bl-full -z-10 blur-xl"></div>
<div class="text-center mb-10">
<h2 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">Start Your Journey</h2>
<p class="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">Fill out this quick form and our team will match you with the best opportunity to make a difference.</p>
</div>
<form class="space-y-6">
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<div>
<label class="block font-label-bold text-label-bold text-on-surface mb-2" for="firstName">First Name</label>
<input class="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 text-body-md font-body-md focus:ring-2 focus:ring-secondary focus:outline-none transition-shadow" id="firstName" placeholder="Jane" type="text"/>
</div>
<div>
<label class="block font-label-bold text-label-bold text-on-surface mb-2" for="lastName">Last Name</label>
<input class="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 text-body-md font-body-md focus:ring-2 focus:ring-secondary focus:outline-none transition-shadow" id="lastName" placeholder="Doe" type="text"/>
</div>
</div>
<div>
<label class="block font-label-bold text-label-bold text-on-surface mb-2" for="email">Email Address</label>
<input class="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 text-body-md font-body-md focus:ring-2 focus:ring-secondary focus:outline-none transition-shadow" id="email" placeholder="jane@example.com" type="email"/>
</div>
<div>
<label class="block font-label-bold text-label-bold text-on-surface mb-3">I want to...</label>
<div class="flex flex-wrap gap-4">
<label class="cursor-pointer relative">
<input class="peer sr-only" name="interest" type="radio" value="fund"/>
<div class="px-6 py-3 rounded-full border border-outline-variant text-on-surface-variant font-body-md text-body-md peer-checked:bg-secondary-container peer-checked:text-on-secondary-container peer-checked:border-secondary transition-all hover:bg-surface-container">
                                Fund a Project
                            </div>
</label>
<label class="cursor-pointer relative">
<input checked="" class="peer sr-only" name="interest" type="radio" value="mentor"/>
<div class="px-6 py-3 rounded-full border border-outline-variant text-on-surface-variant font-body-md text-body-md peer-checked:bg-tertiary-fixed peer-checked:text-on-tertiary-fixed peer-checked:border-tertiary transition-all hover:bg-surface-container">
                                Volunteer / Mentor
                            </div>
</label>
<label class="cursor-pointer relative">
<input class="peer sr-only" name="interest" type="radio" value="partner"/>
<div class="px-6 py-3 rounded-full border border-outline-variant text-on-surface-variant font-body-md text-body-md peer-checked:bg-primary-fixed peer-checked:text-on-primary-fixed peer-checked:border-primary transition-all hover:bg-surface-container">
                                Discuss Partnership
                            </div>
</label>
</div>
</div>
<div class="pt-4">
<button class="w-full bg-primary text-on-primary font-label-bold text-label-bold py-4 rounded-full hover:bg-on-primary-fixed-variant transition-colors duration-300 shadow-md" type="submit">
                        Submit Interest
                    </button>
</div>
</form>
</div>
</section>
<!-- Footer Shared Component -->
<footer class="bg-surface-container-low dark:bg-surface-container-highest rounded-t-lg mt-12 border-t-0">
<div class="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop py-12 gap-8 w-full max-w-container-max mx-auto">
<div class="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed flex items-center gap-2">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">eco</span>
                 YAD
            </div>
<div class="flex flex-wrap justify-center gap-6">
<a class="text-on-surface-variant dark:text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors font-body-md text-body-md" href="#">Privacy Policy</a>
<a class="text-on-surface-variant dark:text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors font-body-md text-body-md" href="#">Terms of Service</a>
<a class="text-on-surface-variant dark:text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors font-body-md text-body-md" href="#">Impact Report</a>
<a class="text-on-surface-variant dark:text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors font-body-md text-body-md" href="#">Careers</a>
<a class="text-on-surface-variant dark:text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors font-body-md text-body-md" href="#">Contact Us</a>
</div>
<div class="text-on-surface dark:text-on-surface font-body-md text-body-md text-center md:text-right">
                © 2024 Youth Advancement for Development (YAD). All rights reserved.
            </div>
</div>
</footer>`;

export const Route = createFileRoute("/get-involved")({
  head: () => ({ meta: [{ title: 'Get Involved — YAD' }] }),
  component: Page,
});

function Page() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
