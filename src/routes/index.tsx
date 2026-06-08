import { createFileRoute } from "@tanstack/react-router";

const html = `<!-- TopNavBar -->
<nav class="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-md bg-transparent flat no shadows transition-all duration-300">
<div class="flex justify-between items-center px-margin-desktop py-6 max-w-container-max mx-auto">
<a class="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed" href="#">YAD</a>
<div class="hidden md:flex items-center gap-8 font-body-md text-body-md">
<a class="text-secondary font-bold border-b-2 border-secondary pb-1 hover:scale-105 transition-transform duration-200" href="/">Home</a>
<a class="text-on-surface-variant hover:text-primary transition-colors hover:scale-105 duration-200" href="/about">About Us</a>
<a class="text-on-surface-variant hover:text-primary transition-colors hover:scale-105 duration-200" href="/programs">Features</a>
<a class="text-on-surface-variant hover:text-primary transition-colors hover:scale-105 duration-200" href="/impact">Our Work</a>
<a class="text-on-surface-variant hover:text-primary transition-colors hover:scale-105 duration-200" href="/get-involved">Contact</a>
</div>
<div class="hidden md:flex items-center gap-4">
<button class="px-6 py-3 rounded-full bg-secondary-container text-on-secondary-container font-label-bold text-label-bold hover:scale-105 transition-transform shadow-sm">Donate</button>
<button class="px-6 py-3 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-bold text-label-bold hover:scale-105 transition-transform shadow-sm">Join Us</button>
</div>
<!-- Mobile Menu Icon -->
<button class="md:hidden text-on-surface">
<span class="material-symbols-outlined text-3xl">menu</span>
</button>
</div>
</nav>
<!-- Hero Section -->
<section class="relative min-h-[921px] flex items-center pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop overflow-hidden bg-surface-container-lowest">
<!-- Organic Background Image with Gradient Overlay -->
<div class="absolute inset-0 z-0 opacity-80 gradient-mask">
<img alt="Vibrant, surreal landscape featuring lush green floating islands and cascading waterfalls in a bright, optimistic light mode aesthetic." class="w-full h-full object-cover object-top" data-alt="A striking, modern digital art representation of nature and development. A vibrant, surreal landscape featuring lush green floating islands suspended over a misty valley, with cascading waterfalls and a bright, clear blue sky. The lighting is optimistic, high-key white light creating an airy, organic minimalist aesthetic. The color palette emphasizes primary deep forest greens, soft neutral surfaces, and bright sky blues, evoking a sense of actionable hope and nurturing environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7GOyR80VjC-X1Ub4pIDl1VE7P9mizjHl3SabzE-sRskxNheAbfOI45-rL-bgwdwwpSVv0w5ua4HEKZVQJo_BRXKmYOnAzegHeyV973XmLDOgzHv0h9TujyevjELdUvAAxJNjAp3MpulKr4xrDdsSGNl6wicW1G6C8vYgKkK8hRWS1TWvODfwjhdAJ6q3xc66U59CdoxGXHFGCALD6_c_qx3MRT6S8g-ohGM81NkjmXfK30f7cZdHr9BL32PQwycwglgEutZnNqxQ"/>
<div class="absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/60 to-transparent"></div>
</div>
<div class="relative z-10 max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter">
<div class="col-span-1 lg:col-span-7 flex flex-col justify-center items-start">
<h1 class="font-display-lg text-display-lg text-primary mb-6 drop-shadow-sm leading-tight">
                    Empowering Cambodia's Youth to <span class="text-secondary">Lead Tomorrow</span>
</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-10">
                    Each small action you take today sets off a wave of positive change for the future of our communities. We are building a nurturing ecosystem for young changemakers to thrive in sustainable development.
                </p>
<div class="flex flex-wrap gap-4">
<button class="px-8 py-4 rounded-full bg-secondary-container text-on-secondary-container font-label-bold text-label-bold hover:scale-105 transition-all shadow-ambient flex items-center gap-2">
                        Our Approach
                        <span class="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</div>
</div>
</section><section class="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface">
<div class="max-w-container-max mx-auto">
<div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
<div class="lg:col-span-7 rounded-xl overflow-hidden shadow-ambient">
<img alt="Cambodian youth collaborating" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1FI8hQZUG2-8yfNWGZjApkMdYvun6YcLo8_IG2QLGPS1PunlyHDe29cu5MnDm9MuGtJTbd7fVogQiUhYegnPnjsObncwdVmQFCdtteLDcF9Pnde7Pw5M1n8Cm2CG4gdbEbhs7o4_AMiMaMoEPqT_8yZdALRkLVbsY6QdIePvNBGE44j3dU1VB2cE77qt81Ac9L3IpODiNHUYVAOP0rCXQ381f-w2kJ7p1n5mh3bArJ4X9BY85oWiDQxc0oRP7jNyeeGhnhyCyTcY"/>
</div>
<div class="lg:col-span-5 flex flex-col gap-6">
<h2 class="font-headline-lg text-headline-lg text-primary">Our Impact in Action</h2>
<p class="font-body-lg text-body-lg text-on-surface-variant">Witness the energy of Cambodia's next generation. Through our modern learning spaces, we provide the tools for digital literacy and leadership training that spark real-world change.</p>
<div class="flex items-center gap-2 text-secondary font-label-bold">
<span class="material-symbols-outlined">groups</span>
<span>1,200+ Youth Empowered This Year</span>
</div>
</div>
</div>
</div>
</section>
<!-- Program Previews (Floating Cards) -->
<section class="relative z-20 -mt-32 pb-section-gap px-margin-mobile md:px-margin-desktop">
<div class="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
<!-- Card 1 -->
<div class="bg-surface/80 backdrop-blur-xl rounded-xl p-8 shadow-ambient flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-300 border border-white/20">
<div class="w-32 h-32 rounded-[2rem] overflow-hidden mb-6 bg-tertiary-fixed-dim">
<img alt="Students learning" class="w-full h-full object-cover" data-alt="Young diverse students collaborating around a laptop in a bright, modern educational setting. The lighting is soft and natural, highlighting a feeling of accessible learning and digital innovation. The aesthetic is modern corporate mixed with organic minimalism, featuring subtle background blurs and a light color palette dominated by tertiary blues and soft neutrals." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTLzd98MENEAX7n9WzRktKw-t5RPHLOm2jmWn-Oi2dgB82jaNfiVBH1jBoZeOcw49AsSFQTq8TvcUqBRk5N8ptJbHcQ0hKz4ihuovBgl56Njuzj7lgAOYjhFDdjKKQxBlB-crwCZXqNgv7-KCW8hIlvtxMzvxY4ZQ0NPBNzr3I4VCuUTLhDvSYA_Or7GMMv45V6RzhPjR9JoWK3p7lx8IG8maRxaKLkp1zX7dTSal8t_rifu4Z9twTvCkh71bjwOj1Fl1nx_3Bbww"/>
</div>
<h3 class="font-headline-md text-headline-md text-tertiary mb-3">DYTP</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Developing youth leadership through hands-on community projects.</p>
</div>
<!-- Card 2 -->
<div class="bg-secondary-container/40 backdrop-blur-xl rounded-xl p-8 shadow-ambient flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-300 border border-white/30 transform md:-translate-y-8">
<div class="w-32 h-32 rounded-[2rem] overflow-hidden mb-6 bg-secondary-fixed">
<img alt="Digital Innovation" class="w-full h-full object-cover" data-alt="A close-up of hands typing on a laptop with lush green plants softly blurred in the background. The scene represents digital innovation in a nurturing, eco-friendly environment. High-key lighting creates an airy feel, emphasizing secondary green tones and organic textures, aligning with a modern, forward-thinking visual language." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2VlUxGH4RSXa6CI3tPIyKBNHlQRsoULh201t5dVYWaoRr3fHIcO5wLzJlBayLovjO4oqZEJ01aiQRdsiAuRyfcjmMz1FZxoLdxQwITZEjSG9rmz8R62I8j0rHhnEk2YZve4KQVjOJljRxnucOBm-cH1Suw9H42os_2zxA66ol-ZmogT71Oop-noB6BI1uymWBhHt0LWgXs51QpfkU9Afkst2XMHrAvtxY0ytZ770W5-UHOQXqSysJ83-IAKJea2fQcntqUZY7SgQ"/>
</div>
<h3 class="font-headline-md text-headline-md text-secondary mb-3">Digital Innovation</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Equipping the next generation with modern technological skills.</p>
</div>
<!-- Card 3 -->
<div class="bg-surface/80 backdrop-blur-xl rounded-xl p-8 shadow-ambient flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-300 border border-white/20">
<div class="w-32 h-32 rounded-[2rem] overflow-hidden mb-6 bg-surface-variant">
<img alt="Slum Education" class="w-full h-full object-cover" data-alt="A bright, abstract representation of education and growth. Open books floating gently in a sunlit, minimalist white space with subtle shadows. The aesthetic is clean, modern, and accessible, using heavy whitespace and soft-edge geometry to create an emotionally uplifting response of actionable hope and learning." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBaNMPI6Trxc24nCe1kzwa5Uq_v-licmKyJ2PF6Eij4n5Pa8atF1UhRRCcEW3O3xE3NSXi5hdue5xNV6GqInMjmBkfycId7hbMSuwZ7NwTQqAjGr06sTpZi2l8UH0GlL5hIbRM53W8Pwq0tErvPpN5W2KXA29igIW4E9QwpWRlBSt0i85IMf3_Lp7twi3tb_mE0vgD-cJ5c067ghS_deXgId67BpACXVlWMDiUjz6vTrqMvXyLFv4pMdxsSc_N9yAF8UNbrAgol-A"/>
</div>
<h3 class="font-headline-md text-headline-md text-primary-container mb-3">Slum Education</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Providing accessible learning resources to marginalized areas.</p>
</div>
</div>
</section>
<!-- Footer -->
<section class="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-low">
<div class="max-w-container-max mx-auto text-center mb-12">
<h2 class="font-headline-lg text-headline-lg text-primary mb-4">Community Voices</h2>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Hear from the mentors and students who are shaping the future of their villages.</p>
</div>
<div class="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
<div class="rounded-xl overflow-hidden shadow-ambient">
<img alt="Community gathering" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClR5Nw1nDmz680LplpkTr-plyhgcKKNlSPbR8hDHcCb76ZGDtEPfokkyhESJ6igu4IMkbVJ4Q8kMb9odg2ihOAiWjumQBhBJhGN_s_VTPuxQMDPFGi5xYNpw0d0QsFXRg_oB6PtAmCKdLJOek8Niw4SSwEp20qbX7_lf56mdQXWy-IBAWjGrfdy1BvjX9cnVNmNAUHRTl69nRu-IJxdPdHbM3REMfvn9Gpx0MCqbRaWQBSgErMaPw84t_YcQ-XQm-mpliLnm0gnlo"/>
</div>
<div class="bg-surface p-8 rounded-xl shadow-sm border border-outline-variant">
<span class="material-symbols-outlined text-secondary text-3xl mb-4">format_quote</span>
<p class="font-body-lg text-body-lg text-on-surface italic mb-6">"YAD didn't just give us resources; they gave us a platform to lead. Seeing the children in my village learn to read and dream bigger is the greatest reward."</p>
<div>
<p class="font-label-bold text-label-bold text-primary">Sophea Ran</p>
<p class="text-sm text-on-surface-variant">Youth Mentor, Siem Reap</p>
</div>
</div>
</div>
</section><section class="py-section-gap px-margin-mobile md:px-margin-desktop">
<div class="max-w-container-max mx-auto bg-primary-container rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
<div class="relative z-10">
<h2 class="font-display-lg text-headline-lg md:text-display-lg text-primary-fixed mb-6">Ready to Join the Movement?</h2>
<p class="font-body-lg text-body-lg text-on-primary-container max-w-2xl mx-auto mb-10">Your support fuels the innovation and education needed to build a sustainable future for Cambodia's youth.</p>
<div class="flex flex-wrap justify-center gap-4">
<button class="px-8 py-4 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-bold text-label-bold hover:scale-105 transition-all shadow-ambient">Become a Partner</button>
<button class="px-8 py-4 rounded-full border-2 border-primary-fixed text-primary-fixed font-label-bold text-label-bold hover:bg-primary-fixed hover:text-primary transition-all">Volunteer Today</button>
</div>
</div>
<div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]"></div>
</div>
</section><footer class="bg-surface-container-low dark:bg-surface-container-highest rounded-t-lg mt-auto">
<div class="flex flex-col md:flex-row justify-between items-center px-margin-desktop py-12 gap-8 w-full max-w-container-max mx-auto transition-all duration-300">
<div class="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">
                YAD
            </div>
<div class="text-on-surface dark:text-on-surface font-body-md text-body-md text-center md:text-left">
                © 2024 Youth Advancement for Development (YAD). All rights reserved.
            </div>
<div class="flex flex-wrap justify-center md:justify-end gap-6 font-body-md text-body-md">
<a class="text-on-surface-variant dark:text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors" href="#">Privacy Policy</a>
<a class="text-on-surface-variant dark:text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors" href="#">Terms of Service</a>
<a class="text-on-surface-variant dark:text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors" href="#">Impact Report</a>
<a class="text-on-surface-variant dark:text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors" href="#">Careers</a>
<a class="text-on-surface-variant dark:text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors" href="#">Contact Us</a>
</div>
</div>
</footer>`;

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: 'YAD — Youth Advancement for Development' }] }),
  component: Page,
});

function Page() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
