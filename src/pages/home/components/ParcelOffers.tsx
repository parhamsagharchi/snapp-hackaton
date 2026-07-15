import type { IParcel, IPassenger } from "@/store/map.store";
import type { ParcelOffer } from "@/utils/parcelOffers.types";
import { ParcelOfferCard } from "./ParcelOfferCard";
import { useTranslation } from "@/i18n";

interface ParcelOffersProps {
  selectedPassenger: IPassenger;
  selectedParcel: IParcel | null;
  parcelOffers: ParcelOffer[];
  onSelectParcel: (parcel: IParcel) => void;
}

export function ParcelOffers({
  selectedPassenger,
  selectedParcel,
  parcelOffers,
  onSelectParcel,
}: ParcelOffersProps) {
  const { t } = useTranslation();

  // If passenger has orderOptionsActive, they cannot receive parcels
  if (selectedPassenger?.orderOptionsActive) {
    return (
      <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3">
        <h3 className="mb-2 text-sm font-semibold text-yellow-300">
          {t("home.offers.title")}
        </h3>
        <p className="text-xs text-yellow-200/80">
          {t("home.offers.orderActiveWarning")}
        </p>
      </div>
    );
  }

  if (parcelOffers.length === 0) {
    return (
      <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
        <h3 className="mb-2 text-sm font-semibold text-slate-100">
          {t("home.offers.title")}
        </h3>
        <p className="text-xs text-slate-400">{t("home.offers.none")}</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
      <h3 className="mb-2 text-sm font-semibold text-slate-100">
        {t("home.offers.title")}
      </h3>
      <div className="space-y-2">
        {parcelOffers.map((offer, index) => (
          <ParcelOfferCard
            key={index}
            offer={offer}
            index={index}
            selectedPassenger={selectedPassenger}
            selectedParcel={selectedParcel}
            onSelect={onSelectParcel}
          />
        ))}
      </div>
    </div>
  );
}
