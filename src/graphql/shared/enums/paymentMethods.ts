export enum PaymentMethod {
  Cheque = 'Cheque',
  Transfer = 'Transfer',
  Carte = 'Carte',
  Cash = 'Cash',
}

export const PAYMENT_METHOD_OPTIONS = [
  { value: PaymentMethod.Cheque, label: 'Chèque' },
  { value: PaymentMethod.Transfer, label: 'Virement' },
  { value: PaymentMethod.Carte, label: 'Carte' },
  { value: PaymentMethod.Cash, label: 'Espèce' },
];
