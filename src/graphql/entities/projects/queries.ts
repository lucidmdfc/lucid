import { gql } from '@apollo/client';
import { PROJECT_FRAGMENT } from './fragments';

export const GET_PROJECTS = gql`
  query GetProjects {
    projectsCollection {
      edges {
        node {
          ...ProjectFragment
        }
      }
    }
  }
  ${PROJECT_FRAGMENT}
`;
export const GET_PROJECT_BY_ID = gql`
  query GetProjects {
    projectsCollection(filter: { id: { eq: $id } }) {
      edges {
        node {
          ...ProjectFragment
        }
      }
    }
  }
  ${PROJECT_FRAGMENT}
`;
