import { TCreditCardInfo } from "./wallet";

export interface IReserveRequestFormSchemeDTO {
  firstName: string;
  lastName: string;
  email: string;
  bookingForAnother: boolean;
  paymentMethod: TCreditCardInfo;
}

export interface IReserveRequestDTO {
  email: string;
  firstName: string;
  lastName: string;
  travelers: number;
  paymentMethod: TCreditCardInfo;
  bookingForAnother: boolean;
}
