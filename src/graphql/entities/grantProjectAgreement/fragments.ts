import { gql } from '@apollo/client';

// grant and agreement_date fields do not exist in the current version of the API, but are included for future compatibility.
// They are currently set to null in the API response.
export const GRANT_PROJECT_AGREEMENT_FRAGMENT = gql`
  fragment GrantProjectAgreementFragment on grant_project_agreement {
    id
    project_id
    grant
    agreement_date
    created_at
    updated_at
    donor_id
  }
`;
// grant_project_agreementCollection
