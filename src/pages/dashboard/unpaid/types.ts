export type PaymentStatus = 'paid' | 'pending' | 'overdue';

export interface BaseUnpaidData {
  id: string;
  projectName: string;
  amount: number;
  dueDate: string;
  daysOverdue: number;
  status: PaymentStatus;
}

export interface FactureData extends BaseUnpaidData {
  invoiceNumber: string;
  clientName: string;
  issueDate: string;
  description?: string;
}

export interface SalaireUnpaidData extends BaseUnpaidData {
  employeeName: string;
  position: string;
  paymentPeriod: string;
  lastPayment?: string;
}

export interface UtilityUnpaidData extends BaseUnpaidData {
  utilityType: 'electricity' | 'water' | 'internet' | 'phone' | 'other';
  provider: string;
  billingPeriod: string;
  referenceNumber?: string;
}

export interface PrestaireUnpaidData extends BaseUnpaidData {
  supplierName: string;
  serviceType: string;
  contractPeriod: string;
  contactInfo: string;
  invoiceReference?: string;
}
