export interface SaveContactRequest {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  addressLine1?: string;
  addressLine2?: string;
  state?: string;
  city?: string;
  postalCode?: string;
  countryCode?: string;
}
