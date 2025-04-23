import { gql } from '@apollo/client';

export const PROVIDER_INVOICE_FRAGMENT = gql`
  fragment ProviderInvoiceFragment on provider_invoices {
    id
    service_provider_id
    project_id
    invoice_number
    amount
    issue_date
    due_date
    payment_date
    status
    created_at
    updated_at
  }
`;
