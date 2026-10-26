const SUPPORTED_LANGUAGES = ["ar", "en"];

/**
 * The backend normally returns the saved account language. Older/admin-created
 * accounts can have no language, so fall back to the browser language first,
 * then to any previously saved local choice, then Arabic.
 */
export const resolveLanguage = (serverLanguage) => {
  if (SUPPORTED_LANGUAGES.includes(serverLanguage)) {
    return serverLanguage;
  }

  const browserLanguage =
    typeof navigator !== "undefined"
      ? (navigator.language || "").toLowerCase().split("-")[0]
      : "";

  if (SUPPORTED_LANGUAGES.includes(browserLanguage)) {
    return browserLanguage;
  }

  const storedLanguage =
    typeof window !== "undefined" ? localStorage.getItem("lang") : null;

  if (SUPPORTED_LANGUAGES.includes(storedLanguage)) {
    return storedLanguage;
  }

  return "ar";
};
