import type { IParcel } from "@/store/map.store";
import type { ParcelOffer } from "@/utils/parcelOffers.types";
import { calculateDistance } from "@/utils/tsp";
import { areCoordinatesEqual } from "@/utils/coordinates";
import type { IPassenger } from "@/store/map.store";

interface ParcelOfferCardProps {
  offer: ParcelOffer;
  index: number;
  selectedPassenger: IPassenger;
  selectedParcel: IParcel | null;
  onSelect: (parcel: IParcel) => void;
}

export function ParcelOfferCard({
  offer,
  index,
  selectedPassenger,
  selectedParcel,
  onSelect,
}: ParcelOfferCardProps) {
  const isSelected =
    selectedParcel && areCoordinatesEqual(selectedParcel, offer.parcel);
  const isBestOffer = index === 0;
  const distance = calculateDistance(selectedPassenger, offer.parcel);

  const getCardClassName = () => {
    if (isSelected) {
      return "border-orange-500/60 bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-orange-500/5 shadow-lg shadow-orange-500/25 ring-1 ring-orange-500/30";
    }
    if (isBestOffer) {
      return "border-yellow-500/70 bg-gradient-to-br from-yellow-500/20 via-yellow-500/10 to-yellow-500/5 shadow-lg shadow-yellow-500/20 ring-1 ring-yellow-500/40";
    }
    return "border-slate-700/60 bg-gradient-to-br from-slate-800/60 to-slate-800/40 hover:border-slate-600/80 hover:from-slate-800/80 hover:to-slate-800/60 hover:shadow-md transition-all";
  };

  return (
    <div
      onClick={() => onSelect(offer.parcel)}
      className={`group cursor-pointer rounded-xl border p-4 transition-all duration-300 ${getCardClassName()}`}
    >
      <div className="flex items-start gap-3">
        {/* Icon Section */}
        <div
          className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg ${
            isSelected
              ? "bg-orange-500/30"
              : isBestOffer
              ? "bg-yellow-500/30"
              : "bg-slate-700/50 group-hover:bg-slate-700/70"
          } transition-colors`}
        >
          <span className="text-xl">📦</span>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          {/* Header with badges */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-bold text-white">
                {offer.parcel.displayName}
              </h4>
              {offer.parcel.vendor && (
                <span className="inline-flex items-center rounded-md bg-primary/25 px-2 py-0.5 text-[10px] font-semibold text-primary border border-primary/40 shadow-sm">
                  {offer.parcel.vendor}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {isBestOffer && (
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-500/30 to-yellow-500/20 px-2.5 py-1 text-[10px] font-bold text-yellow-200 border border-yellow-500/50 shadow-sm">
                  <span className="text-xs">⭐</span>
                  <span>بهترین</span>
                </span>
              )}
              {isSelected && (
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500/30 to-orange-500/20 px-2 py-1 text-[10px] font-semibold text-orange-200 border border-orange-500/50 shadow-sm">
                  <span>✓</span>
                  <span>انتخاب شده</span>
                </span>
              )}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-medium">
                فاصله تا مسافر:
              </span>
              <span className="text-[10px] text-slate-200 font-semibold">
                {distance.toFixed(2)} کیلومتر
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-medium">
                فاصله کل:
              </span>
              <span className="text-[10px] text-slate-200 font-semibold">
                {offer.totalDistance.toFixed(2)} کیلومتر
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-medium">
                انحراف:
              </span>
              <span className="text-[10px] text-slate-200 font-semibold">
                {offer.detourDistance.toFixed(2)} کیلومتر
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-medium">
                زمان:
              </span>
              <span className="text-[10px] text-slate-200 font-semibold">
                {offer.estimatedTime.toFixed(0)} دقیقه
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-medium">
                امتیاز:
              </span>
              <span
                className={`text-[10px] font-bold ${
                  isBestOffer
                    ? "text-yellow-300"
                    : isSelected
                    ? "text-orange-300"
                    : "text-slate-100"
                }`}
              >
                {offer.score.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
