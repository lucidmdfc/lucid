export interface expense {
  id: string;
  projectId: string;
  salaryId: string;
  startDate: Date;
  endDate?: Date;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  comment?: string;
}

export interface ExpenseDetails {
  text: string;
  value: string;
}

export const expenseDetails: ExpenseDetails[] = [
  { text: 'Transport', value: 'transport' },
  { text: 'Hébergement', value: 'accommodation' },
  { text: 'Repas', value: 'meals' },
  { text: 'Cadeaux & Représentations', value: 'gifts_and_entertainment' },
  { text: 'Documentation', value: 'documentation' },
];
