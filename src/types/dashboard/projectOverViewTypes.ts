export type PaymentStatus = 'paid' | 'pending' | 'overdue';

export interface BaseProjectData {
  id: string;
  projectName: string;
  amount: number;
  date: string;
  status: PaymentStatus;
  donor: string;
}

export interface TrancheData extends BaseProjectData {
  trancheNumber: number;
  trancheType: 'initial' | 'milestone' | 'final';
  dueDate: string;
  description?: string;
}

export interface SalaireData extends BaseProjectData {
  employeeName: string;
  position: string;
  paymentPeriod: string;
  lastPayment?: string;
}

export interface UtilityData extends BaseProjectData {
  utilityType: 'electricity' | 'water' | 'internet' | 'phone' | 'other';
  provider: string;
  billingPeriod: string;
  dueDate: string;
}

export interface PrestaireData extends BaseProjectData {
  supplierName: string;
  serviceType: string;
  contractPeriod: string;
  contactInfo: string;
  dueDate: string;
}

export interface SoldeData extends BaseProjectData {
  transactionType: 'income' | 'expense';
  category: string;
  runningBalance: number;
  description: string;
}

export interface ExpenseData extends BaseProjectData {
  id: string;
  employeeName: string;
  amount: number;
  date: string;
  status: PaymentStatus;
  expenseType: string;
  description: string;
}
