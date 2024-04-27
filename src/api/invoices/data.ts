import { Invoice, InvoiceStatus } from 'src/types/invoice';

function generateDummyInvoices(): Invoice[] {
  const invoices: Invoice[] = [];

  for (let i = 1; i <= 10; i++) {
    const invoice: Invoice = {
      id: `FAC00${i}`,
      customer: `Client ${i}`,
      status: i % 2 === 0 ? InvoiceStatus.Paid : InvoiceStatus.Pending,
      designation: `Invoice ${i}`,
      dueDate: new Date(`2024-05-${15 + i}`),
      issueDate: new Date(`2024-04-${10 + i}`),
      endDate: new Date(`2024-05-${25 + i}`),
      items: [
        {
          id: `item00${i}-1`,
          description: `Item 1 of Invoice ${i}`,
          price: 10 * i,
          quantity: i,
          amount: 10 * i * i,
        },
        {
          id: `item00${i}-2`,
          description: `Item 2 of Invoice ${i}`,
          price: 5 * i,
          quantity: i,
          amount: 5 * i * i,
        },
      ],
      note: `Please make the payment by the due date for Invoice ${i}.`,
    };

    invoices.push(invoice);
  }

  return invoices;
}

export const dummyInvoices = generateDummyInvoices();
