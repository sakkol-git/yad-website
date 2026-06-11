import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const alt = 'YAD — Youth Advancement for Development';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const logoData = readFileSync(
    join(process.cwd(), 'public/assets/images/yad_logo.png')
  );
  const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #f0fdf4, #ffffff)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <img
          src={logoSrc}
          width="208"
          height="210"
          alt="YAD Logo"
          style={{ marginBottom: '40px' }}
        />
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: '#166534',
            textAlign: 'center',
            padding: '0 40px',
            lineHeight: 1.2,
          }}
        >
          Youth Advancement for Development
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#15803d',
            marginTop: 20,
            textAlign: 'center',
          }}
        >
          Empowering Cambodia&apos;s youth to lead tomorrow
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
