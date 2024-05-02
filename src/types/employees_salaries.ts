export interface salary {
  id: string;
  salaryName: string;
  salaryFunction: string;
  grossSalary: number;
  recruitmentDate: Date;
  createdDate: Date;
  updatedDate?: Date;
}

export interface payment {
  id: string;
  salary: string;
  amount: number;
  date: Date;
  createdDate: Date;
  updatedDate?: Date;
}
