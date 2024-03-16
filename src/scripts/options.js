import {flagUS, flagDE} from "quasar-extras-svg-icons/country-flag-icons";

/**
 * Returns an array of language options.
 *
 * @param {function} t - The translation function.
 * @return {{label, value: string, icon:string}[]} An array of language options.
 */
export function getLanguageOptions(t) {
  return [
    // English
    {value: "de-DE", label: t("language.deDE"), icon: flagDE},
    {value: "en-US", label: t("language.enUS"), icon: flagUS}
  ]
}

/**
 * Returns the language option object with the matching code.
 *
 * @param {function} t - The translation function.
 * @param {string} code - The code of the language option to find.
 *
 * @return {{label, value: string, icon:string}} - The language option object with the matching code.
 *                                                 The object has properties: label, value (string), and icon (string).
 */
export function getLanguageOption(t, code) {
  return getLanguageOptions(t).find(opt => opt.value === code);
}

/**
 * Get the default language option based on the user's browser language.
 *
 * @param {function} t - The translation function.
 * @return {string} - The default language option.
 */
export function getDefaultLanguageOption(t) {
  const options = getLanguageOptions(t);
  if (options.find(opt => opt.value === navigator.language)) {
    return navigator.language;
  }
  return "en-US";
}
