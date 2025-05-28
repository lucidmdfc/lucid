export enum ProviderStatus {
  Canceled = 'rejected',
  Paid = 'accepted',
  Pending = 'pending',
}
export enum PaymentMethod {
  Cheque = 'Chèque',
  Virement = 'Virement',
  Carte = 'Carte',
  Espece = 'Espèce',
}
export interface Supplier {
  id: string;
  projectId: number;
  nom: string;
  ice: string;
  depositedDate: Date;
  dueDate: Date;
  amount: number;
  status: ProviderStatus;
  method: PaymentMethod;
  commentaire: string;
}
