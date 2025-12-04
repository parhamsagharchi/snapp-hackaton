import type { IDriver, IPassenger, IParcel } from "./map.types";

export const initialDriver: IDriver = {
  displayName: "احمد حسینی",
  lat: 35.72,
  lng: 51.45,
};

// Initial passengers data (8 passengers from East Tehran)
export const initialPassengers: IPassenger[] = [
  {
    displayName: "علی احمدی",
    lat: 35.73,
    lng: 51.46,
    orderOptionsActive: false,
  },
  {
    displayName: "فاطمه رضایی",
    lat: 35.71,
    lng: 51.47,
    orderOptionsActive: false,
  },
  {
    displayName: "محمد کریمی",
    lat: 35.75,
    lng: 51.48,
    orderOptionsActive: false,
  },
  {
    displayName: "زهرا موسوی",
    lat: 35.7,
    lng: 51.45,
    orderOptionsActive: false,
  },
  {
    displayName: "حسین نوری",
    lat: 35.74,
    lng: 51.46,
    orderOptionsActive: false,
  },
  {
    displayName: "مریم صادقی",
    lat: 35.72,
    lng: 51.48,
    orderOptionsActive: false,
  },
  {
    displayName: "رضا حسینی",
    lat: 35.69,
    lng: 51.46,
    orderOptionsActive: false,
  },
  {
    displayName: "سارا محمدی",
    lat: 35.76,
    lng: 51.47,
    orderOptionsActive: false,
  },
];

// Initial parcels data (10 parcels from East Tehran)
export const initialParcels: IParcel[] = [
  {
    displayName: "بسته ۱",
    lat: 35.73,
    lng: 51.47,
    vendor: "اسنپ‌شاپ",
  },
  {
    displayName: "بسته ۲",
    lat: 35.71,
    lng: 51.46,
    vendor: "اسنپ‌دکتر",
  },
  {
    displayName: "بسته ۳",
    lat: 35.74,
    lng: 51.48,
    vendor: "اسنپ‌مارکت",
  },
  {
    displayName: "بسته ۴",
    lat: 35.7,
    lng: 51.47,
    vendor: "اسنپ‌باکس",
  },
  {
    displayName: "بسته ۵",
    lat: 35.75,
    lng: 51.46,
    vendor: "اسنپ‌شاپ",
  },
  {
    displayName: "بسته ۶",
    lat: 35.72,
    lng: 51.49,
    vendor: "اسنپ‌دکتر",
  },
  {
    displayName: "بسته ۷",
    lat: 35.69,
    lng: 51.48,
    vendor: "اسنپ‌مارکت",
  },
  {
    displayName: "بسته ۸",
    lat: 35.77,
    lng: 51.47,
    vendor: "اسنپ‌باکس",
  },
  {
    displayName: "بسته ۹",
    lat: 35.73,
    lng: 51.49,
    vendor: "اسنپ‌شاپ",
  },
  {
    displayName: "بسته ۱۰",
    lat: 35.71,
    lng: 51.5,
    vendor: "اسنپ‌دکتر",
  },
];
