import { payment, employee } from 'src/types/employees_salaries';

export const dummySalaries: employee[] = [];

for (let i = 1; i <= 20; i++) {
  const employee: employee = {
    id: i.toString(),
    salaryName: `Employee ${i}`,
    salaryFunction: `Position ${i}`,
    grossSalary: Math.floor(Math.random() * 100000) + 50000, // Random gross salary between 50000 and 150000
    recruitmentDate: new Date(`2022-01-${i < 10 ? '0' + i : i}`), // Recruitment date incrementing by day
    createdDate: new Date(`2022-01-01`),
    updatedDate: new Date(),
  };
  dummySalaries.push(employee);
}

export const dummyPayments: payment[] = [
  {
    id: '1',
    employee: 'John Doe',
    amount: 1000,
    date: new Date('2022-01-01'),
    createdDate: new Date('2022-01-01'),
    updatedDate: new Date('2022-01-01'),
  },
  {
    id: '2',
    employee: 'Jane Smith',
    amount: 1200,
    date: new Date('2022-01-02'),
    createdDate: new Date('2022-01-02'),
    updatedDate: new Date('2022-01-02'),
  },
  {
    id: '3',
    employee: 'Michael Johnson',
    amount: 1100,
    date: new Date('2022-01-03'),
    createdDate: new Date('2022-01-03'),
    updatedDate: new Date('2022-01-03'),
  },
  {
    id: '4',
    employee: 'Emily Davis',
    amount: 1160,
    date: new Date('2022-01-04'),
    createdDate: new Date('2022-01-04'),
    updatedDate: new Date('2022-01-04'),
  },
  {
    id: '5',
    employee: 'Daniel Wilson',
    amount: 1040,
    date: new Date('2022-01-05'),
    createdDate: new Date('2022-01-05'),
    updatedDate: new Date('2022-01-05'),
  },
];
