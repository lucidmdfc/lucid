export enum PaymentMethod {
  Cheque = 'Chèque',
  Virement = 'Virement',
  Carte = 'Carte',
  Espece = 'Espèce',
}

export interface Member {
  id: string;
  full_name: string;
  email?: string;
  amount?: number | '';
  payment_method?: PaymentMethod;
  payment_date?: Date;
  rc_cin: string;
  status: string;
  created_at?: Date;
  updated_at?: Date;
}
