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
  payment_date?: Date | null | undefined;
  rc_cin: string;
  status: Boolean;
  created_at?: Date | null | undefined;
  updated_at?: Date | null | undefined;
}
