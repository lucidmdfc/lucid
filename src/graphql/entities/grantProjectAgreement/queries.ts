import { gql } from '@apollo/client';
import { GRANT_PROJECT_AGREEMENT_FRAGMENT } from './fragments';

export const GET_GRANT_PROJECT_AGREEMENT = gql`
  query GetGrantProjectAgreement {
    grant_project_agreementCollection {
      edges {
        node {
          ...GrantProjectAgreementFragment
        }
      }
    }
  }
  ${GRANT_PROJECT_AGREEMENT_FRAGMENT}
`;
