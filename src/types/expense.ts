export interface expense {
  id: string;
  projectId: string;
  salaryId: string;
  startDate: Date;
  endDate: Date;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
}
