import { Address } from "./Address";

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  homeAddressId: string;
  homeAddress: Address;
}
