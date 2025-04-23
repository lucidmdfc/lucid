import { gql } from '@apollo/client';

export const ISSUED_INVOICE_FRAGMENT = gql`
  fragment IssuedInvoiceFragment on issued_invoices {
    id
    client_id
    project_id
    amount
    issue_date
    due_date
    billingStatus
    created_at
    updated_at
    designation
  }
`;
