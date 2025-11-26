import { useMemo } from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";

interface CustomMarkerProps {
  position: [number, number];
  label: string;
  shortLabel?: string;
  color: string;
  onClick?: () => void;
  children?: React.ReactNode;
  isHovered?: boolean;
  draggable?: boolean;
  onDragEnd?: (e: L.DragEndEvent) => void;
}

export const CustomMarker = ({
  position,
  label,
  shortLabel,
  color,
  onClick,
  children,
  isHovered = false,
  draggable = false,
  onDragEnd,
}: CustomMarkerProps) => {
  const icon = useMemo(() => {
    const markerLabel = shortLabel || label;
    return L.divIcon({
      className: isHovered ? "custom-marker hovered-marker" : "custom-marker",
      html: `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: 'Vazirmatn', 'Vazir Matn', sans-serif;
          direction: rtl;
        ">
          <div style="
            background-color: ${color}; 
            width: ${isHovered || draggable ? "28px" : "24px"}; 
            height: ${isHovered || draggable ? "28px" : "24px"}; 
            border-radius: 50%; 
            border: ${isHovered || draggable ? "4px" : "3px"} solid white; 
            box-shadow: ${
              isHovered || draggable
                ? "0 4px 8px rgba(0,0,0,0.5), 0 0 0 2px " + color
                : "0 2px 4px rgba(0,0,0,0.3)"
            };
            margin-bottom: 2px;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: ${isHovered || draggable ? "12px" : "10px"};
          ">${markerLabel}</div>
          <div style="
            background: white;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: 600;
            color: #333;
            white-space: nowrap;
            box-shadow: ${
              isHovered || draggable
                ? "0 2px 6px rgba(0,0,0,0.3)"
                : "0 1px 3px rgba(0,0,0,0.2)"
            };
            margin-top: 2px;
            font-family: 'Vazirmatn', 'Vazir Matn', sans-serif;
          ">${label}</div>
        </div>
      `,
      iconSize: [80, 45],
      iconAnchor: [40, 45],
    });
  }, [color, label, shortLabel, isHovered, draggable]);

  return (
    <Marker
      position={position}
      icon={icon}
      draggable={draggable}
      eventHandlers={{
        click: onClick,
        ...(onDragEnd && { dragend: onDragEnd }),
      }}
    >
      {children}
    </Marker>
  );
};

