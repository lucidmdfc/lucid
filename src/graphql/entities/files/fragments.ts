import { gql } from '@apollo/client';

export const FILES_FRAGMENT = gql`
  fragment FilesFragment on files {
    id
    storage_provider
    bucket_name
    storage_key
    original_filename
    mime_type
    size_bytes
    document_category
    created_at
    uploaded_at
    metadata
    public_url
    expense_status
    expense_claim_id
    expense_claim_category
    provider_invoice_file_category
    provider_invoice_id
  }
`;
