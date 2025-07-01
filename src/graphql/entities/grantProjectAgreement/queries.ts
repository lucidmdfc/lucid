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
export const GET_GRANT_PROJECT_AGREEMENT_BY_PROJECT = gql`
  query GetGrantProjectAgreementByProject($projectId: Int!) {
    grant_project_agreementCollection(filter: { project_id: { eq: $projectId } }) {
      edges {
        node {
          ...GrantProjectAgreementFragment
        }
      }
    }
  }
  ${GRANT_PROJECT_AGREEMENT_FRAGMENT}
`;
export const GET_ONE_GRANT_PROJECT_AGREEMENT = gql`
  query GetOneGrantProjectAgreement($id: Int!) {
    grant_project_agreementCollection(filter: { id: { eq: $id } }, first: 1) {
      edges {
        node {
          ...GrantProjectAgreementFragment
        }
      }
    }
  }
  ${GRANT_PROJECT_AGREEMENT_FRAGMENT}
`;
