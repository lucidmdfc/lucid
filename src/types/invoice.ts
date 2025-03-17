//Should include invoice number 
//Invoice number should calculated automatically ex: 010324 

import { Item } from './item';

export enum InvoiceStatus {
  Canceled = 'canceled',
  Paid = 'paid',
  Pending = 'pending',
}

export enum BillingCycle {
  Quotidien = 'Quotidien',
  Hebdomadaire = 'Hebdomadaire',
  Mensuel = 'Mensuel',
  Annuel = 'Annuel',
}
export interface Invoice {
  id: string;
  customer: string;
  status: InvoiceStatus;
  designation: string;
  dueDate?: Date;
  issueDate?: Date;
  endDate?: Date;
  billingStatus?: BillingCycle;
  items?: Item[];
  note?: string;
}
