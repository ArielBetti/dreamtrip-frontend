export type TCreditCardInfo = {
  cardNumber: number;
  cardholderName: string;
  expirationDate: {
    month: number;
    year: number;
  };
  cvv: number;
};
