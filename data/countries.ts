/**
 * GNews API supported country codes. Used in Navbar filters.
 * Code format: ISO 3166-1 alpha-2 (e.g. us, gb, in).
 */
export const countries = [
  { code: "us", name: "United States" },
  { code: "gb", name: "United Kingdom" },
  { code: "in", name: "India" },
  { code: "au", name: "Australia" },
  { code: "ca", name: "Canada" },
  { code: "de", name: "Germany" },
  { code: "fr", name: "France" },
  { code: "jp", name: "Japan" },
  { code: "cn", name: "China" },
  { code: "br", name: "Brazil" },
  { code: "mx", name: "Mexico" },
  { code: "es", name: "Spain" },
  { code: "it", name: "Italy" },
  { code: "nl", name: "Netherlands" },
  { code: "ru", name: "Russia" },
  { code: "kr", name: "South Korea" },
  { code: "za", name: "South Africa" },
  { code: "ae", name: "UAE" },
  { code: "sg", name: "Singapore" },
  { code: "ie", name: "Ireland" },
] as const;

export type CountryCode = (typeof countries)[number]["code"];
