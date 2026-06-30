"use client";

import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { MAP_TOKENS, type ImpactNode } from "@/shared/constants/infographic-tokens";
import { ImpactNodeMarker } from "./ImpactNode";
import { useCallback } from "react";

const GEO_URL = "/assets/data/cambodia.topo.json";

interface CambodiaMapClientProps {
  nodes: ImpactNode[];
  activeProvinceNames: Set<string>;
  activeNode: ImpactNode | null;
  hoveredNode: ImpactNode | null;
  maxStudents: number;
  onHoverNode: (node: ImpactNode | null) => void;
  onClickNode: (node: ImpactNode) => void;
}

export default function CambodiaMapClient({
  nodes,
  activeProvinceNames,
  activeNode,
  hoveredNode,
  maxStudents,
  onHoverNode,
  onClickNode,
}: CambodiaMapClientProps) {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        center: [104.9, 12.6],
        scale: 7000,
      }}
      width={800}
      height={600}
      style={{ width: "100%", height: "auto" }}
    >
      <ZoomableGroup center={[104.9, 12.6]} zoom={1} minZoom={1} maxZoom={1}>
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const provinceName = geo.properties.name;
              const isActiveProvince = activeProvinceNames.has(provinceName);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={
                    isActiveProvince
                      ? MAP_TOKENS.cambodiaFillActive
                      : MAP_TOKENS.cambodiaFill
                  }
                  stroke={MAP_TOKENS.cambodiaStroke}
                  strokeWidth={0.8}
                  style={{
                    default: { outline: "none" },
                    hover: {
                      fill: isActiveProvince ? MAP_TOKENS.cambodiaFillActive : "#D5D7D3",
                      outline: "none",
                      cursor: "pointer",
                    },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>

        {/* Impact Nodes */}
        {nodes.map((node, i) => (
          <Marker key={node.id} coordinates={node.coordinates}>
            <ImpactNodeMarker
              node={node}
              index={i}
              isActive={activeNode?.id === node.id || hoveredNode?.id === node.id}
              onHover={onHoverNode}
              onClick={onClickNode}
              maxStudents={maxStudents}
            />
          </Marker>
        ))}
      </ZoomableGroup>
    </ComposableMap>
  );
}
