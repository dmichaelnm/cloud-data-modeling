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

/**
 * Returns an array of roles with their label and value.
 *
 * @param {function} t - The translation function
 * @return {{value:string, label:string}[]} An array of roles with label and value properties.
 */
export function getRoles(t) {
  return [
    {value: "visitor", label: t("role.visitor")},
    {value: "developer", label: t("role.developer")},
    {value: "deployer", label: t("role.deployer")}
  ];
}

/**
 * Retrieves the attribute types.
 *
 * @param {function} t - The translation function.
 * @return {{value:string, label:string}[]} An array of attribute types.
 */
export function getAttributeTypes(t) {
  return [
    {value: "string", label: t("common.customAttributes.types.string")},
    {value: "number", label: t("common.customAttributes.types.number")},
    {value: "boolean", label: t("common.customAttributes.types.boolean")}
  ];
}

/**
 * Retrieves boolean values.
 *
 * @param {function} t - The translation function.
 * @return {{value:string, label:string}[]} An array of boolean values.
 */
export function getBooleanValues(t) {
  return [
    {value: "true", label: t("common.true")},
    {value: "false", label: t("common.false")}
  ];
}
