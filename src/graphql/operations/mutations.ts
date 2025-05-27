import { gql } from '@apollo/client';

export const UPLOAD_FILE = gql`
  mutation uploadFile(
    $file: Upload!
    $documentCategory: String!
    $expense_claim_id: String
    $expense_claim_category: String
    $service_provider_id: String
    $expense_status: Boolean
  ) {
    uploadFile(
      file: $file
      documentCategory: $documentCategory
      expense_claim_category: $expense_claim_category
      expense_status: $expense_status
      expense_claim_id: $expense_claim_id
      service_provider_id: $service_provider_id
    ) {
      url
      path
      type
    }
  }
`;
