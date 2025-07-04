import { gql } from '@apollo/client';
import { FILES_FRAGMENT } from './fragments';

export const GET_FILES = gql`
  query GetFiles {
    filesCollection {
      edges {
        node {
          ...FilesFragment
        }
      }
    }
  }
  ${FILES_FRAGMENT}
`;
export const GET_FILES_BY_EXPENSE_CLAIM = gql`
  query GetFilesByExpenseClaim($expenseClaimId: Int!) {
    filesCollection(
      filter: {
        document_category: { eq: "expense_claims" }
        expense_claim_id: { eq: $expenseClaimId }
      }
    ) {
      edges {
        node {
          ...FilesFragment
        }
      }
    }
  }
  ${FILES_FRAGMENT}
`;
export const GET_FILES_BY_PROVIDER_INVOICE = gql`
  query GetFilesByProvider($providerInvoiceId: Int!) {
    filesCollection(
      filter: {
        document_category: { eq: "provider_invoice_file" }
        provider_invoice_id: { eq: $providerInvoiceId }
      }
    ) {
      edges {
        node {
          ...FilesFragment
        }
      }
    }
  }
  ${FILES_FRAGMENT}
`;

// export const SERVICE_PROVIDERS_FILE = gql`
//   query GetServiceProvidersFiles(
//     $filter: service_provider_files_viewFilter
//     $orderBy: [service_provider_files_viewOrderBy!]
//     $first: Int
//     $last: Int
//     $before: Cursor
//     $after: Cursor
//     $offset: Int
//   ) {
//     service_provider_files_viewCollection(
//       filter: $filter
//       orderBy: $orderBy
//       first: $first
//       last: $last
//       before: $before
//       after: $after
//       offset: $offset
//     ) {
//       edges {
//         node {
//           id
//           original_filename
//           mime_type
//           size_bytes
//           storage_key
//           public_url
//           bucket_name
//           document_category
//           metadata
//           service_provider_id
//           service_provider_name
//           depositeddate
//           duedate
//           amount
//           service_provider_status
//         }
//       }
//     }
//   }
// `;
