"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface SafeImageProps extends ImageProps {
  fallbackInitials?: string;
}

export function SafeImage({ alt, fallbackInitials, ...props }: SafeImageProps) {
  const [failed, setFailed] = useState(false);
  
  if (failed) {
    return (
      <div className="w-full h-full bg-surface-container flex items-center justify-center rounded-md-md border border-outline-variant/30">
        {fallbackInitials ? (
          <span className="font-playfair text-lg font-bold text-on-surface-variant">
            {fallbackInitials}
          </span>
        ) : (
          <span className="material-symbols-outlined text-outline-variant" aria-hidden="true">image</span>
        )}
      </div>
    );
  }
  
  return <Image alt={alt} onError={() => setFailed(true)} {...props} />;
}
