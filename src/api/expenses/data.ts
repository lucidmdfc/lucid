import { expense } from 'src/types/expense';

const generateRandomId = (): string => {
  return Math.random().toString(36).substring(7);
};

const generateRandomDate = (): Date => {
  const start = new Date(2020, 0, 1).getTime();
  const end = new Date().getTime();
  return new Date(start + Math.random() * (end - start));
};

const generateRandomExpense = (): expense => ({
  id: generateRandomId(),
  projectId: generateRandomId(),
  salaryId: generateRandomId(),
  startDate: generateRandomDate(),
  endDate: generateRandomDate(),
  amount: Math.round(Math.random() * 1000), // Random amount between 0 and 1000
  createdAt: generateRandomDate(),
  updatedAt: generateRandomDate(),
  status: Math.random() < 0.5, // Random boolean value
});

const generateExpenses = (count: number): expense[] => {
  const expenses: expense[] = [];
  for (let i = 0; i < count; i++) {
    expenses.push(generateRandomExpense());
  }
  return expenses;
};

export const dummyExpenses: expense[] = generateExpenses(25);
