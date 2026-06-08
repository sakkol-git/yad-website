import { createFileRoute } from "@tanstack/react-router";

const html = `<!-- TopNavBar -->
<nav class="fixed top-0 w-full z-50 bg-surface/60 dark:bg-surface-dim/60 backdrop-blur-md transition-all duration-300" id="main-nav">
<div class="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-6 max-w-container-max mx-auto">
<!-- Brand -->
<a class="flex items-center gap-2 font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed hover:scale-105 transition-transform duration-200" href="#">
<span class="material-symbols-outlined" data-icon="eco" style="font-variation-settings: 'FILL' 1;">eco</span>
                YAD
            </a>
<!-- Desktop Navigation -->
<div class="hidden md:flex items-center gap-8">
<a class="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors hover:scale-105 duration-200" href="/">Home</a>
<a class="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors hover:scale-105 duration-200" href="/about">About Us</a>
<a class="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors hover:scale-105 duration-200" href="/programs">Features</a>
<a class="font-body-md text-body-md text-secondary dark:text-secondary-fixed-dim font-bold border-b-2 border-secondary hover:scale-105 transition-transform duration-200" href="/impact">Our Work</a>
<a class="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors hover:scale-105 duration-200" href="/get-involved">Contact</a>
</div>
<!-- Actions -->
<div class="hidden md:flex items-center gap-4">
<button class="px-6 py-3 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-bold text-label-bold hover:scale-105 transition-all duration-200 shadow-ambient hover:shadow-ambient-hover">
                    Donate
                </button>
<button class="px-6 py-3 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-bold text-label-bold hover:scale-105 transition-all duration-200 shadow-ambient hover:shadow-ambient-hover">
                    Join Us
                </button>
</div>
<!-- Mobile Menu Toggle -->
<button class="md:hidden text-primary">
<span class="material-symbols-outlined" data-icon="menu">menu</span>
</button>
</div>
</nav>
<!-- Main Content -->
<main class="flex-grow pt-32 pb-section-gap">
<!-- Hero Section -->
<section class="relative min-h-[819px] flex items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-section-gap overflow-hidden rounded-xl">
<!-- Background Image -->
<div class="absolute inset-0 z-0">
<img alt="Lush green floating island with waterfalls and small wooden cabins against a bright sky, symbolizing a pristine, harmonious ecological future." class="w-full h-full object-cover object-right" data-alt="A striking digital art piece of a lush, verdant floating island suspended in the sky. The island features cascading waterfalls, dense green foliage, and quaint wooden cabins nestled in the landscape. The scene is illuminated by bright, optimistic daylight, creating an airy, light-mode aesthetic. The color palette is dominated by vibrant secondary greens, soft sky blues, and earthy tones, evoking a sense of actionable hope and nurturing environmentalism." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoLqoCSrowq2Yf-vb5xh4QQy0WD8shoo2Hre8iubOuxLqW30YajiVD0GdSBO7GvwzbM-U2dIjGn3ABUiQE2xo6vlEQRC5xcWbyMfV9p7xGcSVFD2wDqWoGZgmbu33H0MB396Q6V1lHVxUbyHZQrqIz6oYHOmTNZKtRTPAWCn2TCGt7-2NJlM3hvmdq-4JYSCjkYuIbxrjjVk2qWLYVe5qEO3OPaLFn4SMgGoG1Mxf3VyiSFbrxdBf_3wOutHWYIzC4xomqLmvAQ4w"/>
</div>
<!-- Gradient Overlay for Text Readability -->
<div class="absolute inset-0 z-10 hero-gradient w-full md:w-3/4"></div>
<div class="relative z-20 max-w-2xl">
<h1 class="font-display-lg text-display-lg text-primary mb-6 leading-tight">
                    Metrics of <br/>
<span class="text-secondary">Change</span>
</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl">
                    Every small action ripples outwards. Explore our real-time impact dashboard and the inspiring stories of young leaders driving sustainable development across communities.
                </p>
<div class="flex gap-4">
<button class="px-8 py-4 rounded-full bg-primary text-on-primary font-label-bold text-label-bold hover:scale-105 transition-all duration-200 shadow-ambient hover:shadow-ambient-hover flex items-center gap-2">
                        View Dashboard
                        <span class="material-symbols-outlined" data-icon="arrow_downward">arrow_downward</span>
</button>
</div>
</div>
</section>
<!-- Dashboard / Bento Grid Section -->
<section class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-section-gap">
<div class="mb-16">
<h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">Our Global Footprint</h2>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                    Tracking our collective journey towards a more sustainable and equitable future. Data updated quarterly.
                </p>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
<!-- Big Stat Card 1 -->
<div class="col-span-1 md:col-span-2 bg-surface-container-low rounded-xl p-8 flex flex-col justify-between shadow-ambient hover:shadow-ambient-hover transition-all duration-300 group">
<div class="flex justify-between items-start mb-12">
<div class="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container group-hover:scale-110 transition-transform duration-300">
<span class="material-symbols-outlined text-3xl" data-icon="nature_people">nature_people</span>
</div>
<span class="px-4 py-1 rounded-full bg-surface text-primary font-label-bold text-sm">Communities Reached</span>
</div>
<div>
<div class="font-display-lg text-6xl md:text-display-lg text-primary mb-2">245+</div>
<p class="font-body-md text-body-md text-on-surface-variant">Active local sustainability projects led by youth organizers.</p>
</div>
</div>
<!-- Small Stat Card 1 -->
<div class="col-span-1 bg-tertiary-fixed rounded-xl p-8 flex flex-col justify-between shadow-ambient hover:shadow-ambient-hover transition-all duration-300 group">
<div class="flex justify-between items-start mb-8">
<div class="w-12 h-12 rounded-full bg-surface/50 flex items-center justify-center text-on-tertiary-fixed group-hover:scale-110 transition-transform duration-300">
<span class="material-symbols-outlined text-2xl" data-icon="water_drop">water_drop</span>
</div>
</div>
<div>
<div class="font-headline-lg text-headline-lg text-on-tertiary-fixed mb-2">1.2M</div>
<p class="font-body-md text-body-md text-on-tertiary-fixed-variant">Liters of water conserved through new irrigation tech.</p>
</div>
</div>
<!-- Small Stat Card 2 -->
<div class="col-span-1 bg-primary-fixed rounded-xl p-8 flex flex-col justify-between shadow-ambient hover:shadow-ambient-hover transition-all duration-300 group">
<div class="flex justify-between items-start mb-8">
<div class="w-12 h-12 rounded-full bg-surface/50 flex items-center justify-center text-on-primary-fixed group-hover:scale-110 transition-transform duration-300">
<span class="material-symbols-outlined text-2xl" data-icon="energy_savings_leaf">energy_savings_leaf</span>
</div>
</div>
<div>
<div class="font-headline-lg text-headline-lg text-on-primary-fixed mb-2">850k</div>
<p class="font-body-md text-body-md text-on-primary-fixed-variant">Trees planted in deforested regions this year.</p>
</div>
</div>
<!-- Interactive Chart Card (Mockup) -->
<div class="col-span-1 md:col-span-2 bg-surface-container-highest rounded-xl p-8 flex flex-col shadow-ambient relative overflow-hidden">
<div class="flex justify-between items-center mb-6 relative z-10">
<h3 class="font-headline-md text-headline-md text-primary">Youth Engagement Growth</h3>
<button class="text-secondary hover:text-primary transition-colors">
<span class="material-symbols-outlined" data-icon="more_horiz">more_horiz</span>
</button>
</div>
<div class="flex-grow flex items-end gap-2 relative z-10">
<!-- Simulated Bar Chart -->
<div class="w-1/6 bg-secondary-fixed rounded-t-lg h-1/4 hover:bg-secondary transition-colors cursor-pointer" title="2020"></div>
<div class="w-1/6 bg-secondary-fixed rounded-t-lg h-1/3 hover:bg-secondary transition-colors cursor-pointer" title="2021"></div>
<div class="w-1/6 bg-secondary-fixed rounded-t-lg h-1/2 hover:bg-secondary transition-colors cursor-pointer" title="2022"></div>
<div class="w-1/6 bg-secondary-fixed rounded-t-lg h-3/4 hover:bg-secondary transition-colors cursor-pointer" title="2023"></div>
<div class="w-1/6 bg-primary rounded-t-lg h-full relative group cursor-pointer" title="2024 (Current)">
<div class="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface px-3 py-1 rounded shadow-ambient text-xs font-label-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Peak Engagement</div>
</div>
</div>
</div>
</div>
</section>
<!-- Editorial Stories Section -->
<section class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-section-gap">
<div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
<div class="max-w-xl">
<h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">Voices of Impact</h2>
<p class="font-body-lg text-body-lg text-on-surface-variant">
                        Meet the young changemakers turning ideas into reality. These are their stories from the frontlines of development.
                    </p>
</div>
<button class="flex items-center gap-2 text-secondary font-label-bold hover:text-primary transition-colors">
                    Read all stories
                    <span class="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
<!-- Featured Story Card -->
<article class="group cursor-pointer">
<div class="relative h-80 rounded-xl overflow-hidden mb-6 shadow-ambient">
<img alt="Young woman working in a community garden" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A high-quality, candid photograph of a young, diverse woman working diligently in a lush community garden. She is smiling gently, surrounded by vibrant green plants and warm, golden hour sunlight. The lighting is soft and airy, fitting a modern, optimistic light-mode design. The background is slightly blurred to keep focus on her, emphasizing a narrative of nurturing and grassroots environmental action." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEZt0-nixprHmhJxMXdhYonVKGPX6jKXQs3xImZ8JeY87EnWg8kiTuyBeJCJY48vPubDg6D8ai_pb1CZqQjdeK2a04wok9hZVq_L1i68JSQcbqTN801EQZK0Jy_3Vuboyq0j6My99WRi3w4u_s18ozX56_5_MDAAWzxNKQWSK7W__bE3U0wopcgJ3hqz58mCLd6Ukd8Cp9xPJekPVg6Yz_cWC41yZ6KahAbvrtCYJRoofwdqB2Hm0OPOROrSmfhgrJd9YBDRoLmDk"/>
<div class="absolute top-4 left-4">
<span class="px-4 py-2 rounded-full glass-panel text-primary font-label-bold text-xs shadow-sm">Community Action</span>
</div>
</div>
<h3 class="font-headline-md text-headline-md text-primary mb-3 group-hover:text-secondary transition-colors">Sophea Chan’s Journey: Reviving the Urban Oasis</h3>
<p class="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-2">
                        How one student mobilized her neighborhood to transform a forgotten concrete lot into a thriving community garden that now feeds over fifty families.
                    </p>
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden">
<img alt="Portrait of author" class="w-full h-full object-cover" data-alt="A close-up portrait photograph of a young woman with a warm, approachable smile, serving as an author avatar. She has natural lighting illuminating her face, with a soft, out-of-focus background in light tones. The overall feel is professional yet friendly, aligning with an optimistic, youthful brand identity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaQ7h1WyOSDJHgnA46-ubi7HSiMEKdlAE7vtCV7WH5SVxf8cxEyZ6-azyQOiuxIvoht2lgyzwB4iSElTS9LsuQSiVNKm0TT5Rv8nx_8aEp0Q6iGZGx92BijRchLUKfCOOGh0hX0HLP4Hqw3iMc2w5mE8PqGWDgnw9RTztfXo5wcaH7W8iXk3J8hzl0SFUDMR3FfZ36pg00plXBBZPOWIwnzB0GNc1oAu_pBN8rhxTe_bkSHBQGPfQF4Q5EP_Mc-5UgJroyBSdq2U8"/>
</div>
<div>
<p class="font-label-bold text-sm text-primary">By Elena Rostova</p>
<p class="text-xs text-on-surface-variant">5 min read</p>
</div>
</div>
</article>
<!-- Secondary Stories List -->
<div class="flex flex-col gap-6">
<article class="flex gap-6 group cursor-pointer bg-surface hover:bg-surface-container-low p-4 rounded-xl transition-colors duration-300">
<div class="w-1/3 h-32 rounded-lg overflow-hidden shrink-0">
<img alt="Close up of water drops on leaves" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="A macro photograph of pristine water drops resting gently on vibrant green leaves. The focus is sharp on the droplets, reflecting soft, bright light, while the background is a smooth, creamy bokeh of greens. The image conveys a sense of purity, conservation, and detailed ecological care, perfectly suited for a clean, modern environmental theme." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyyfFfLz-o225Wvl1sIR2IpKZ1dQaMq54neWnNftdpQtwRgEYPXGOCEf2g4iHY3ig1nZHu066FQvs6IMAet-HvBUIR1YOCmMbw8Ywq9IVlYh6e9VLc6gIy57MNraZ2NBFD3hWsTkngIQHy9Pj1klWghaQ1Knba51g9bODC7A9YjBRLDowM1Gl-hEsG8n1ymJGj9XJjlNlRp8oZ_okDrJ9sLpSVxF3hjDb6Aep1kUVkuPq3Yw3dRCps5rXocTLrg-qvSfwIj7FVpuo"/>
</div>
<div class="flex flex-col justify-center">
<span class="text-xs font-label-bold text-secondary mb-2 uppercase tracking-wider">Innovation</span>
<h4 class="font-body-lg text-body-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors">Tech for Clean Water in Rural Areas</h4>
<p class="font-body-md text-sm text-on-surface-variant line-clamp-2">A new filtration system designed by local engineers is providing safe drinking water.</p>
</div>
</article>
<article class="flex gap-6 group cursor-pointer bg-surface hover:bg-surface-container-low p-4 rounded-xl transition-colors duration-300">
<div class="w-1/3 h-32 rounded-lg overflow-hidden shrink-0">
<img alt="Solar panels at sunset" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="A clean, modern photograph of solar panels bathed in the warm, golden light of early morning. The sky above is clear and bright, indicating a hopeful start to the day. The composition emphasizes the sleek geometry of the panels against the soft, natural background, highlighting the harmony between technology and renewable energy." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHrIzIaiRC8Ns-5Ez7xLHMcrVFmlomum7WOOon1bURrrrkn3xEpo8BXv_EGonNAP1BhR606o7FLPqiROt9S5ZkT0361kfRb7A0Zh7C51Kw0r2LIwhVZE-47Q_8HeXkPU6qB_3gwsM_wiEmOsnsOrntDNvP-WuoBGO-J_-5IbwNjFCtUOXs4eS5mBh9MOfOn9QRlj1-r9Hw63OPKVWWmKfwu_7AlrIAaSSyUHudumMn4V6akfWCgM7I346XLgLvdSX-MKppRptcHcQ"/>
</div>
<div class="flex flex-col justify-center">
<span class="text-xs font-label-bold text-secondary mb-2 uppercase tracking-wider">Energy</span>
<h4 class="font-body-lg text-body-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors">Solar Micro-Grids Empowering Schools</h4>
<p class="font-body-md text-sm text-on-surface-variant line-clamp-2">How off-grid solutions are keeping the lights on for evening adult education classes.</p>
</div>
</article>
</div>
</div>
</section>
<!-- Radical Transparency (Reports) Section -->
<section class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto bg-surface-container-highest rounded-xl p-8 md:p-16 shadow-ambient">
<div class="text-center mb-12">
<h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">Radical Transparency</h2>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                    We believe in open books and clear impact. Dive into our annual reports and financial breakdowns to see exactly how contributions are utilized.
                </p>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
<!-- Document Card -->
<a class="bg-surface rounded-lg p-6 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-ambient" href="#">
<div class="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
<span class="material-symbols-outlined text-3xl" data-icon="description">description</span>
</div>
<h3 class="font-body-lg font-bold text-primary mb-2">2023 Annual Report</h3>
<p class="text-sm text-on-surface-variant mb-6">Comprehensive overview of our projects, financials, and strategic goals.</p>
<span class="text-secondary font-label-bold flex items-center gap-1 mt-auto">
                        Download PDF
                        <span class="material-symbols-outlined text-sm" data-icon="download">download</span>
</span>
</a>
<!-- Document Card -->
<a class="bg-surface rounded-lg p-6 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-ambient" href="#">
<div class="w-16 h-16 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
<span class="material-symbols-outlined text-3xl" data-icon="pie_chart">pie_chart</span>
</div>
<h3 class="font-body-lg font-bold text-primary mb-2">Q4 Financial Summary</h3>
<p class="text-sm text-on-surface-variant mb-6">Detailed breakdown of income streams and program expenditures.</p>
<span class="text-secondary font-label-bold flex items-center gap-1 mt-auto">
                        View Online
                        <span class="material-symbols-outlined text-sm" data-icon="visibility">visibility</span>
</span>
</a>
<!-- Document Card -->
<a class="bg-surface rounded-lg p-6 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-ambient" href="#">
<div class="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
<span class="material-symbols-outlined text-3xl" data-icon="verified_user">verified_user</span>
</div>
<h3 class="font-body-lg font-bold text-primary mb-2">Third-Party Audit</h3>
<p class="text-sm text-on-surface-variant mb-6">Independent verification of our operational metrics and fund allocation.</p>
<span class="text-secondary font-label-bold flex items-center gap-1 mt-auto">
                        Download PDF
                        <span class="material-symbols-outlined text-sm" data-icon="download">download</span>
</span>
</a>
</div>
</section>
</main>
<!-- Footer -->
<footer class="bg-surface-container-low dark:bg-surface-container-highest rounded-t-lg transition-all duration-300 mt-auto">
<div class="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop py-12 gap-8 w-full max-w-container-max mx-auto">
<!-- Brand -->
<div class="flex flex-col items-center md:items-start gap-4">
<a class="flex items-center gap-2 font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed" href="#">
<span class="material-symbols-outlined" data-icon="eco" style="font-variation-settings: 'FILL' 1;">eco</span>
                    YAD
                </a>
<p class="font-body-md text-body-md text-on-surface dark:text-on-surface text-center md:text-left">
                    © 2024 Youth Advancement for Development (YAD). All rights reserved.
                </p>
</div>
<!-- Links -->
<div class="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4">
<a class="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors" href="#">Privacy Policy</a>
<a class="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors" href="#">Terms of Service</a>
<a class="font-body-md text-body-md text-primary dark:text-primary-fixed-dim font-bold hover:text-secondary dark:hover:text-secondary-fixed transition-colors" href="#">Impact Report</a>
<a class="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors" href="#">Careers</a>
<a class="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors" href="#">Contact Us</a>
</div>
</div>
</footer>
<!-- Micro-interactions Script -->`;

export const Route = createFileRoute("/impact")({
  head: () => ({ meta: [{ title: 'Impact & Stories — YAD' }] }),
  component: Page,
});

function Page() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
