import { gql } from '@apollo/client';

export const PROVIDER_INVOICE_FRAGMENT = gql`
  fragment ProviderInvoiceFragment on provider_invoices {
    id
    service_provider_id
    project_id
    service_providers {
      name
    }
    status {
      name
    }
    invoice_number
    amount_ht
    tax_rate
    amount_ttc
    currency
    issue_date
    due_date
    payment_date
    payment_method
    status_id
    notes
    created_at
    updated_at
  }
`;
