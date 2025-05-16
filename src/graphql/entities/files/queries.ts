import { gql } from '@apollo/client';
import { FILES_FRAGMENT } from './fragments';

export const GET_FILES = gql`
  query GetFiles {
    filesCollection {
      edges {
        node {
          ...FilesFragment
        }
      }
    }
  }
  ${FILES_FRAGMENT}
`;
