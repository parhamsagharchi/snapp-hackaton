import type { Language } from "./config";

/**
 * Bilingual handling for sample data (names, vendors, places).
 *
 * The store keeps the original Persian values, and these helpers translate
 * them at render time so switching language never mutates the data itself.
 */

const PERSON_NAMES: Record<string, string> = {
  "احمد حسینی": "Ahmad Hosseini",
  "علی احمدی": "Ali Ahmadi",
  "فاطمه رضایی": "Fatemeh Rezaei",
  "محمد کریمی": "Mohammad Karimi",
  "زهرا موسوی": "Zahra Mousavi",
  "حسین نوری": "Hossein Nouri",
  "مریم صادقی": "Maryam Sadeghi",
  "رضا حسینی": "Reza Hosseini",
  "سارا محمدی": "Sara Mohammadi",
  "امیر عباسی": "Amir Abbasi",
  "نرگس اکبری": "Narges Akbari",
  "پویا رحمانی": "Pouya Rahmani",
  "نیلوفر کاظمی": "Niloufar Kazemi",
  "مهدی جعفری": "Mehdi Jafari",
  "لیلا امینی": "Leila Amini",
  "کامران طاهری": "Kamran Taheri",
  "سمیرا یوسفی": "Samira Yousefi",
  "بهرام شریفی": "Bahram Sharifi",
  "نازنین باقری": "Nazanin Bagheri",
};

const VENDORS: Record<string, string> = {
  "اسنپ‌شاپ": "SnappShop",
  "اسنپ‌دکتر": "SnappDoctor",
  "اسنپ‌مارکت": "SnappMarket",
  "اسنپ‌باکس": "SnappBox",
};

const PLACES: Record<string, string> = {
  "میدان آزادی": "Azadi Square",
  "پل بسیج": "Basij Bridge",
  "تجریش": "Tajrish",
};

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/**
 * Convert digits inside a string to the digits used by the given language.
 */
export function localizeDigits(value: string | number, language: Language): string {
  const str = String(value);
  if (language === "fa") {
    return str.replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)]);
  }
  return str.replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)));
}

/**
 * Translate a data-driven display name (person, vendor, place or "بسته N")
 * for the requested language. Unknown, user-edited values pass through
 * unchanged (with digits localized).
 */
export function localizeName(name: string | undefined | null, language: Language): string {
  if (!name) return "";
  if (language === "fa") return name;

  if (PERSON_NAMES[name]) return PERSON_NAMES[name];
  if (VENDORS[name]) return VENDORS[name];
  if (PLACES[name]) return PLACES[name];

  // Pattern: "بسته ۱" / "بسته 1" -> "Parcel 1"
  const parcelMatch = name.match(/^بسته\s+([۰-۹0-9]+)$/);
  if (parcelMatch) {
    return `Parcel ${localizeDigits(parcelMatch[1], "en")}`;
  }

  return localizeDigits(name, language);
}
