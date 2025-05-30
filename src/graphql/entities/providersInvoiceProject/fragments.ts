import { gql } from '@apollo/client';

export const PROVIDERS_INVOICE_PROJECT_FRAGMENT = gql`
  fragment ProvidersInvoiceProjectFragment on providers_invoice_project {
    id
    created_at
    updated_at
    provider_invoice_id
    project_id
  }
`;
