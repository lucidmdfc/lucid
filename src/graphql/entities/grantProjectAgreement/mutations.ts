import { gql } from '@apollo/client';
import { GRANT_PROJECT_AGREEMENT_FRAGMENT } from './fragments';

export const CREATE_GRANT_AGREEMENT = gql`
  mutation CreateGrantAgreement(
    $donor_id: Int!
    $project_id: Int!
    $grant: String!
    $agreement_date: date!
  ) {
    insertIntogrant_project_agreementCollection(
      objects: [
        {
          donor_id: $donor_id
          project_id: $project_id
          grant: $grant
          agreement_date: $agreement_date
        }
      ]
    ) {
      records {
        ...GrantProjectAgreementFragment
      }
    }
  }
  ${GRANT_PROJECT_AGREEMENT_FRAGMENT}
`;
