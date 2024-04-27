export enum ProviderStatus {
  Canceled = 'canceled',
  Paid = 'paid',
  Pending = 'pending',
}
export interface provider {
  id: string;
  projectId: number;
  nom: string;
  ice: string;
  depositedDate: Date;
  dueDate: Date;
  amount: number;
  status: ProviderStatus;
  method: string;
  commentaire: string;
}

// ! add interface method payment
// ! change name to Suppliers
