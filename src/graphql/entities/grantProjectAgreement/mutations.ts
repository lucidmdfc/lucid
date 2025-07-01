import { gql } from '@apollo/client';
import { GRANT_PROJECT_AGREEMENT_FRAGMENT } from './fragments';

export const CREATE_GRANT_AGREEMENT = gql`
  mutation CreateGrantAgreement(
    $donor_id: Int!
    $project_id: Int!
    $grant: BigFloat!
    $agreement_date: Date!
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

export const UPDATE_GRANT_AGREEMENT = gql`
  mutation UpdateGrantAgreement(
    $set: grant_project_agreementUpdateInput!
    $filter: grantsFilter
    $atMost: Int!
  ) {
    updategrant_project_agreementCollection(set: $set, filter: $filter, atMost: $atMost) {
      records {
        ...GrantProjectAgreementFragment
      }
    }
  }
  ${GRANT_PROJECT_AGREEMENT_FRAGMENT}
`;
