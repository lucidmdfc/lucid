import { salary } from 'src/types/salary';

export const dummySalaries: salary[] = [];

for (let i = 1; i <= 20; i++) {
  const salary: salary = {
    id: i.toString(),
    salaryName: `Employee ${i}`,
    salaryFunction: `Position ${i}`,
    grossSalary: Math.floor(Math.random() * 100000) + 50000, // Random gross salary between 50000 and 150000
    recruitmentDate: new Date(`2022-01-${i < 10 ? '0' + i : i}`), // Recruitment date incrementing by day
    createdDate: new Date(`2022-01-01`),
    updatedDate: new Date(),
  };
  dummySalaries.push(salary);
}
