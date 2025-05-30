import { gql } from '@apollo/client';

export const CLIENT_FRAGMENT = gql`
  fragment ClientFragment on clients {
    id
    entity_id
    created_at
    updated_at
    ice
  }
`;
