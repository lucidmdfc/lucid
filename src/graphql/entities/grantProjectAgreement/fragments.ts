import { gql } from '@apollo/client';
import { PROJECT_FRAGMENT } from '../projects/fragments';
import { DONOR_FRAGMENT } from '../donors/fragments';

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
    projects {
      ...ProjectFragment
    }
    donors {
      ...DonorFragment
    }
  }
  ${PROJECT_FRAGMENT}
  ${DONOR_FRAGMENT}
`;
// grant_project_agreementCollection
