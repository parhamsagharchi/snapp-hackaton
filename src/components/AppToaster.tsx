import { Toaster } from "react-hot-toast";
import { useTranslation } from "@/i18n";

/**
 * Toaster whose text direction follows the active language.
 */
export function AppToaster() {
  const { dir, language } = useTranslation();

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          textAlign: "center",
          direction: dir,
          borderRadius: "8px",
          background: "#333",
          color: "#fff",
          // Latin numerals in English, Persian numerals in Farsi
          fontFamily:
            language === "en"
              ? "'AppLatinDigits', 'IRANSansXFaNum'"
              : "IRANSansXFaNum",
        },
      }}
    />
  );
}
