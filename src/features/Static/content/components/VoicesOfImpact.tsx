import Image from "next/image";
import { Button } from "@/shared/components/ui/Button";

export function VoicesOfImpact() {
  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-section-gap">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-xl">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
            Voices of Impact
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Meet the young changemakers turning ideas into reality. These
            are their stories from the frontlines of development.
          </p>
        </div>
        <Button variant="link" className="px-0 gap-2 text-secondary font-label-bold hover:text-primary transition-colors no-underline hover:no-underline">
          Read all stories
          <span className="material-symbols-outlined">arrow_forward</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Featured Story */}
        <article className="group cursor-pointer">
          <div className="relative h-80 rounded-lg overflow-hidden mb-6 shadow-ambient">
            <Image
              alt="Young woman working in a community garden"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEZt0-nixprHmhJxMXdhYonVKGPX6jKXQs3xImZ8JeY87EnWg8kiTuyBeJCJY48vPubDg6D8ai_pb1CZqQjdeK2a04wok9hZVq_L1i68JSQcbqTN801EQZK0Jy_3Vuboyq0j6My99WRi3w4u_s18ozX56_5_MDAAWzxNKQWSK7W__bE3U0wopcgJ3hqz58mCLd6Ukd8Cp9xPJekPVg6Yz_cWC41yZ6KahAbvrtCYJRoofwdqB2Hm0OPOROrSmfhgrJd9YBDRoLmDk"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute top-4 left-4">
              <span className="px-4 py-2 rounded-full glass-panel text-primary font-label-bold text-xs shadow-sm">
                Community Action
              </span>
            </div>
          </div>
          <h3 className="font-headline-md text-headline-md text-primary mb-3 group-hover:text-secondary transition-colors">
            Sophea Chan&apos;s Journey: Reviving the Urban Oasis
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-2">
            How one student mobilized her neighborhood to transform a
            forgotten concrete lot into a thriving community garden that now
            feeds over fifty families.
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden relative">
              <Image
                alt="Portrait of author"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaQ7h1WyOSDJHgnA46-ubi7HSiMEKdlAE7vtCV7WH5SVxf8cxEyZ6-azyQOiuxIvoht2lgyzwB4iSElTS9LsuQSiVNKm0TT5Rv8nx_8aEp0Q6iGZGx92BijRchLUKfCOOGh0hX0HLP4Hqw3iMc2w5mE8PqGWDgnw9RTztfXo5wcaH7W8iXk3J8hzl0SFUDMR3FfZ36pg00plXBBZPOWIwnzB0GNc1oAu_pBN8rhxTe_bkSHBQGPfQF4Q5EP_Mc-5UgJroyBSdq2U8"
                fill
                sizes="40px"
              />
            </div>
            <div>
              <p className="font-label-bold text-sm text-primary">
                By Elena Rostova
              </p>
              <p className="text-xs text-on-surface-variant">5 min read</p>
            </div>
          </div>
        </article>

        {/* Secondary Stories */}
        <div className="flex flex-col gap-6">
          <article className="flex gap-6 group cursor-pointer bg-surface hover:bg-surface-container-low p-4 rounded-lg transition-colors duration-300">
            <div className="w-1/3 h-32 rounded-md overflow-hidden shrink-0 relative">
              <Image
                alt="Close up of water drops on leaves"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyyfFfLz-o225Wvl1sIR2IpKZ1dQaMq54neWnNftdpQtwRgEYPXGOCEf2g4iHY3ig1nZHu066FQvs6IMAet-HvBUIR1YOCmMbw8Ywq9IVlYh6e9VLc6gIy57MNraZ2NBFD3hWsTkngIQHy9Pj1klWghaQ1Knba51g9bODC7A9YjBRLDowM1Gl-hEsG8n1ymJGj9XJjlNlRp8oZ_okDrJ9sLpSVxF3hjDb6Aep1kUVkuPq3Yw3dRCps5rXocTLrg-qvSfwIj7FVpuo"
                fill
                sizes="33vw"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xs font-label-bold text-secondary mb-2 uppercase tracking-wider">
                Innovation
              </span>
              <h4 className="font-body-lg text-body-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                Tech for Clean Water in Rural Areas
              </h4>
              <p className="font-body-md text-sm text-on-surface-variant line-clamp-2">
                A new filtration system designed by local engineers is
                providing safe drinking water.
              </p>
            </div>
          </article>
          <article className="flex gap-6 group cursor-pointer bg-surface hover:bg-surface-container-low p-4 rounded-lg transition-colors duration-300">
            <div className="w-1/3 h-32 rounded-md overflow-hidden shrink-0 relative">
              <Image
                alt="Solar panels at sunset"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHrIzIaiRC8Ns-5Ez7xLHMcrVFmlomum7WOOon1bURrrrkn3xEpo8BXv_EGonNAP1BhR606o7FLPqiROt9S5ZkT0361kfRb7A0Zh7C51Kw0r2LIwhVZE-47Q_8HeXkPU6qB_3gwsM_wiEmOsnsOrntDNvP-WuoBGO-J_-5IbwNjFCtUOXs4eS5mBh9MOfOn9QRlj1-r9Hw63OPKVWWmKfwu_7AlrIAaSSyUHudumMn4V6akfWCgM7I346XLgLvdSX-MKppRptcHcQ"
                fill
                sizes="33vw"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xs font-label-bold text-secondary mb-2 uppercase tracking-wider">
                Energy
              </span>
              <h4 className="font-body-lg text-body-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                Solar Micro-Grids Empowering Schools
              </h4>
              <p className="font-body-md text-sm text-on-surface-variant line-clamp-2">
                How off-grid solutions are keeping the lights on for evening
                adult education classes.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
