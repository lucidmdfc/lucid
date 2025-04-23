export interface employee {
  id: string;
  salaryName: string;
  salaryFunction: string;
  grossSalary: number;
  recruitmentDate: Date;
  email: string;
  phone: string;
  status: string;
  createdDate: Date;
  updatedDate?: Date;
}

export interface payment {
  id: string;
  employee: string;
  amount: number;
  date: Date;
  createdDate: Date;
  updatedDate?: Date;
}
