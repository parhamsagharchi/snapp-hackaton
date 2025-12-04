import { useMemo } from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import carIcon from "@/assets/images/car.png";

export type MarkerIconType = "driver" | "passenger" | "parcel" | "default";

interface CustomMarkerProps {
  position: [number, number];
  label: string;
  shortLabel?: string;
  color: string;
  iconType?: MarkerIconType;
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
  iconType = "default",
  onClick,
  children,
  isHovered = false,
  draggable = false,
  onDragEnd,
}: CustomMarkerProps) => {
  const icon = useMemo(() => {
    const size = isHovered || draggable ? 32 : 28;
    const borderWidth = isHovered || draggable ? "4px" : "3px";
    const shadow = isHovered || draggable
      ? `0 4px 8px rgba(0,0,0,0.5), 0 0 0 2px ${color}`
      : "0 2px 4px rgba(0,0,0,0.3)";

    // Create icon HTML based on type
    let iconHTML = "";
    if (iconType === "driver") {
      // Car icon using car.png image - just the image, no background, border, or padding
      const carImageUrl = carIcon; // Vite returns the URL string
      const carSize = size + 8; // Make car icon bigger (8px larger)
      iconHTML = `
        <div style="
          margin-bottom: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <img 
            src="${carImageUrl}" 
            alt="ماشین" 
            style="
              width: ${carSize}px; 
              height: ${carSize}px; 
              object-fit: contain;
            "
          />
        </div>
      `;
    } else if (iconType === "passenger") {
      // User icon
      iconHTML = `
        <div style="
          background-color: ${color}; 
          width: ${size}px; 
          height: ${size}px; 
          border-radius: 50%; 
          border: ${borderWidth} solid white; 
          box-shadow: ${shadow};
          margin-bottom: 2px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        ">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      `;
    } else if (iconType === "parcel") {
      // Parcel box emoji - with lighter, brighter background and rounded-full like passenger
      // Use bright yellow background instead of dark orange
      const lightBg = color === "#D97706" ? "#FBBF24" : "#FDE047"; // Bright yellow for better visibility
      iconHTML = `
        <div style="
          background: linear-gradient(135deg, ${lightBg} 0%, ${lightBg} 50%, ${color} 100%); 
          width: ${size}px; 
          height: ${size}px; 
          border-radius: 50%; 
          border: ${borderWidth} solid white; 
          box-shadow: ${shadow};
          margin-bottom: 2px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${size - 4}px;
          filter: drop-shadow(0 1px 1px rgba(0,0,0,0.1));
        ">📦</div>
      `;
    } else {
      // Default circle with text
    const markerLabel = shortLabel || label;
      iconHTML = `
        <div style="
          background-color: ${color}; 
          width: ${size}px; 
          height: ${size}px; 
          border-radius: 50%; 
          border: ${borderWidth} solid white; 
          box-shadow: ${shadow};
          margin-bottom: 2px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: ${isHovered || draggable ? "10px" : "9px"};
        ">${markerLabel}</div>
      `;
    }

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
          ${iconHTML}
          <div style="
            background: white;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 9px;
            font-weight: 500;
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
  }, [color, label, shortLabel, iconType, isHovered, draggable, carIcon]);

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

