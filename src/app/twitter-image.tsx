import { ImageResponse } from "next/og";

export const alt = "YAD — Youth Advancement for Development";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  // Fetch from the live production URL to ensure the image is reliably loaded across Vercel environments
  const logoData = await fetch("https://yadkh.org/assets/images/yad_logo.png").then((res) =>
    res.arrayBuffer(),
  );

  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(to bottom right, #f0fdf4, #ffffff)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}
    >
      <img
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        src={logoData as any}
        width={400}
        height={404}
        alt="YAD Logo"
        style={{ marginBottom: "30px" }}
      />
      <div
        style={{
          fontSize: 48,
          fontWeight: "bold",
          color: "#166534",
          textAlign: "center",
          padding: "0 40px",
          lineHeight: 1.2,
        }}
      >
        Youth Advancement for Development
      </div>
    </div>,
    {
      ...size,
    },
  );
}
