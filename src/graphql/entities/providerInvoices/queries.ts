import { gql } from '@apollo/client';
import { PROVIDER_INVOICE_FRAGMENT } from './fragments';

export const GET_PROVIDER_INVOICES = gql`
  query GetProvidersInvoices(
    $filter: provider_invoicesFilter
    $orderBy: [provider_invoicesOrderBy!]
    $first: Int
    $last: Int
    $before: Cursor
    $after: Cursor
    $offset: Int
  ) {
    provider_invoicesCollection(
      filter: $filter
      orderBy: $orderBy
      first: $first
      last: $last
      before: $before
      after: $after
      offset: $offset
    ) {
      edges {
        node {
          ...ProviderInvoiceFragment
        }
      }
    }
  }
  ${PROVIDER_INVOICE_FRAGMENT}
`;
