import { gql } from '@apollo/client';

export const CLIENT_FRAGMENT = gql`
  fragment ClientFragment on Client {
    id
    entity_id
    created_at
    updated_at
    ice
  }
`;
