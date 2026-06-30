declare module "react-simple-maps" {
  import React from "react";

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: {
      center?: [number, number];
      scale?: number;
      rotate?: [number, number, number];
    };
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }

  export interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    children?: React.ReactNode;
  }

  export interface GeographiesProps {
    geography: string | object;
    children: (data: { geographies: Geography[] }) => React.ReactNode;
  }

  export interface Geography {
    rsmKey: string;
    properties: Record<string, string>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  export interface GeographyProps {
    geography: Geography;
    key?: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: {
      default?: React.CSSProperties & { outline?: string };
      hover?: React.CSSProperties & { outline?: string; cursor?: string };
      pressed?: React.CSSProperties & { outline?: string };
    };
    onClick?: (event: React.MouseEvent) => void;
    onMouseEnter?: (event: React.MouseEvent) => void;
    onMouseLeave?: (event: React.MouseEvent) => void;
  }

  export interface MarkerProps {
    coordinates: [number, number];
    children?: React.ReactNode;
  }

  export const ComposableMap: React.FC<ComposableMapProps>;
  export const ZoomableGroup: React.FC<ZoomableGroupProps>;
  export const Geographies: React.FC<GeographiesProps>;
  export const Geography: React.FC<GeographyProps>;
  export const Marker: React.FC<MarkerProps>;
}
