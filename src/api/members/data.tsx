import { Member, PaymentMethod } from 'src/types/member';

// Create an object mapping string values to enum keys
const PaymentMethodMap: { [key: string]: PaymentMethod } = {
  Chèque: PaymentMethod.Cheque,
  Virement: PaymentMethod.Virement,
  Carte: PaymentMethod.Carte,
  Espèce: PaymentMethod.Espece,
};

const membersData: Member[] = [];

for (let i = 1; i <= 20; i++) {
  const paymentMethodIndex = i % 4;
  const paymentMethodString = Object.keys(PaymentMethod)[paymentMethodIndex];
  const paymentMethod = PaymentMethodMap[paymentMethodString];

  const member: Member = {
    id: `ID-${i}`,
    status: i % 2 === 0 ? true : false,
    payment_method: paymentMethod,
    rc_cin: `RC_CIN_${i}`,
    updated_at: new Date(Date.now() - i * 1000 * 60 * 60 * 24), // Varying dates
    created_at: new Date(Date.now() - i * 1000 * 60 * 60 * 24 * 2), // Varying dates
    email: `example${i}@mail.com`,
    payment_date:
      paymentMethod === PaymentMethod.Espece
        ? null
        : new Date(Date.now() - i * 1000 * 60 * 60 * 24 * 3), // Varying dates
    amount: i * 1000, // Varying amounts
    full_name: `Member ${i}`,
  };

  membersData.push(member);
}

// Export the generated membersData array
export { membersData };
