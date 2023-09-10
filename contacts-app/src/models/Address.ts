import { Country } from "./Country";

export interface Address {
  id: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  city: string;
  postalCode: string;
  countryId: string;
  country: Country;
}
