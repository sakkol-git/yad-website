import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

const tailwindConfigScript = `
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-secondary-fixed": "#012200",
        "on-primary-fixed-variant": "#205031",
        "surface": "#f8faf8",
        "on-secondary-fixed-variant": "#2a4f21",
        "surface-container-high": "#e6e9e7",
        "primary": "#013619",
        "inverse-surface": "#2e3130",
        "on-primary-fixed": "#00210d",
        "tertiary": "#1b303d",
        "surface-dim": "#d8dad9",
        "surface-bright": "#f8faf8",
        "surface-container-highest": "#e1e3e1",
        "tertiary-fixed": "#cfe6f6",
        "on-background": "#191c1b",
        "background": "#f8faf8",
        "secondary": "#416837",
        "secondary-container": "#bfecae",
        "on-tertiary-fixed-variant": "#344956",
        "on-primary": "#ffffff",
        "secondary-fixed": "#c2efb1",
        "on-tertiary-fixed": "#061e29",
        "primary-fixed": "#baefc4",
        "on-error": "#ffffff",
        "primary-container": "#1d4d2e",
        "primary-fixed-dim": "#9fd3aa",
        "surface-tint": "#396847",
        "on-error-container": "#93000a",
        "surface-variant": "#e1e3e1",
        "inverse-primary": "#9fd3aa",
        "surface-container": "#eceeec",
        "tertiary-fixed-dim": "#b3cad9",
        "tertiary-container": "#324754",
        "on-surface": "#191c1b",
        "on-primary-container": "#8abd95",
        "surface-container-lowest": "#ffffff",
        "on-surface-variant": "#414941",
        "error-container": "#ffdad6",
        "outline-variant": "#c1c9bf",
        "secondary-fixed-dim": "#a6d296",
        "on-tertiary-container": "#9eb5c4",
        "on-secondary": "#ffffff",
        "surface-container-low": "#f2f4f2",
        "inverse-on-surface": "#eff1ef",
        "outline": "#717971",
        "on-tertiary": "#ffffff",
        "error": "#ba1a1a",
        "on-secondary-container": "#456c3a"
      },
      borderRadius: { "DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px" },
      spacing: {
        "container-max": "1280px",
        "gutter": "24px",
        "margin-mobile": "20px",
        "section-gap": "120px",
        "margin-desktop": "60px"
      },
      fontFamily: {
        "label-bold": ["Plus Jakarta Sans"],
        "body-md": ["Plus Jakarta Sans"],
        "body-lg": ["Plus Jakarta Sans"],
        "display-lg": ["Plus Jakarta Sans"],
        "headline-md": ["Plus Jakarta Sans"],
        "headline-lg-mobile": ["Plus Jakarta Sans"],
        "headline-lg": ["Plus Jakarta Sans"]
      },
      fontSize: {
        "label-bold": ["14px", { "lineHeight": "1.2", "fontWeight": "700" }],
        "body-md": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "display-lg": ["72px", { "lineHeight": "1.1", "letterSpacing": "-0.04em", "fontWeight": "800" }],
        "headline-md": ["32px", { "lineHeight": "1.3", "fontWeight": "700" }],
        "headline-lg-mobile": ["36px", { "lineHeight": "1.2", "fontWeight": "700" }],
        "headline-lg": ["48px", { "lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700" }]
      }
    }
  }
};
`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <p className="mt-4 text-on-surface-variant">Page not found</p>
        <Link to="/" className="mt-6 inline-block px-6 py-3 rounded-full bg-secondary-container text-on-secondary-container font-bold">Go home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-bold text-primary">Something went wrong</h1>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 px-6 py-3 rounded-full bg-secondary-container text-on-secondary-container font-bold"
        >Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "YAD — Youth Advancement for Development" },
      { name: "description", content: "Empowering Cambodia's youth to lead tomorrow through education, technology, and community programs." },
      { property: "og:title", content: "YAD — Youth Advancement for Development" },
      { property: "og:description", content: "Empowering Cambodia's youth to lead tomorrow." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800&display=swap" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="light">
      <head>
        <HeadContent />
      </head>
      <body className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
