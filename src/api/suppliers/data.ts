import { Supplier, ProviderStatus, PaymentMethod } from 'src/types/supplier';

// Create an object mapping string values to enum keys
const PaymentMethodMap: { [key: string]: PaymentMethod } = {
  Virement: PaymentMethod.Virement,
  Carte: PaymentMethod.Carte,
  Cheque: PaymentMethod.Cheque,
  Espece: PaymentMethod.Espece,
};

const dummySuppliers: Supplier[] = [];

for (let i = 1; i <= 10; i++) {
  const methodIndex = i % 4;
  const methodString = Object.keys(PaymentMethod)[methodIndex];
  const method = PaymentMethodMap[methodString];

  const provider: Supplier = {
    id: `ID-${i}`,
    projectId: i,
    nom: `Supplier ${i}`,
    ice: `ICE${Math.random().toString(36).substring(7).toLocaleUpperCase()}`,
    depositedDate: new Date(`2022-${i < 10 ? '0' + i : i}-01`),
    dueDate: new Date(`2022-${i < 10 ? '0' + i : i}-10`),
    amount: i * 1000,
    status: i % 2 === 0 ? ProviderStatus.Paid : ProviderStatus.Pending,
    method: method,
    commentaire: 'Lorem ipsum dolor sit amet.',
  };

  dummySuppliers.push(provider);
}

export { dummySuppliers };
