import {flagUS, flagDE} from "quasar-extras-svg-icons/country-flag-icons";

/**
 * Returns an array of language options.
 *
 * @param {Object} t - The translation object.
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
 * @param {Object} t - The translation object.
 * @param {string} code - The code of the language option to find.
 *
 * @return {{label, value: string, icon:string}} - The language option object with the matching code.
 *                                                 The object has properties: label, value (string), and icon (string).
 */
export function getLanguageOption(t, code) {
  return getLanguageOptions(t).find(opt => opt.value === code);
}
