export interface expense {
  id: string;
  projectId: string;
  salaryId: string;
  startDate: Date;
  endDate: Date | null;
  amount: number | '';
  createdAt: Date;
  updatedAt: Date;
}
