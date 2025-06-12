import { gql } from '@apollo/client';
import { PROVIDER_INVOICE_FRAGMENT } from './fragments';

export const CREATE_PROVIDER_INVOICE = gql`
  mutation CreateProviderInvoice(
    $service_provider_id: Int!
    $project_id: Int!
    $invoice_number: String!
    $amount_ht: numeric!
    $tax_rate: numeric!
    $amount_ttc: numeric!
    $currency: String!
    $issue_date: date!
    $due_date: date
    $payment_date: date
    $payment_method: String!
    $status_id: Int!
    $storage_key: String
    $file_url: String
    $notes: String
  ) {
    insertIntoprovider_invoicesCollection(
      objects: {
        service_provider_id: $service_provider_id
        project_id: $project_id
        invoice_number: $invoice_number
        amount_ht: $amount_ht
        tax_rate: $tax_rate
        amount_ttc: $amount_ttc
        currency: $currency
        issue_date: $issue_date
        due_date: $due_date
        payment_date: $payment_date
        payment_method: $payment_method
        status_id: $status_id
        storage_key: $storage_key
        file_url: $file_url
        notes: $notes
      }
    ) {
      records {
        ...ProviderInvoiceFragment
      }
    }
  }
  ${PROVIDER_INVOICE_FRAGMENT}
`;

export const DELETE_PROVIDER_INVOICE = gql`
  mutation DeleteProviderInvoice($id: Int!) {
    deleteFromprovider_invoicesCollection(filter: { id: { eq: $id } }) {
      affectedCount
    }
  }
`;
