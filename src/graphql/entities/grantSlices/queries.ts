import { gql } from '@apollo/client';
import { GRANT_SLICE_FRAGMENT } from './fragments';

export const GET_GRANTS_SLICE_BY_PROJECT_ID = gql`
  query GetGrantsByProjectId($projectId: Int!) {
    grant_slicesCollection(filter: { project_id: { eq: $projectId } }) {
      edges {
        node {
          ...GrantFragment
        }
      }
    }
  }
  ${GRANT_SLICE_FRAGMENT}
`;
