import { gql } from '@apollo/client';

export const DELETE_GRANT_SLICE = gql`
  mutation DeleteGrantSlice($id: Int!) {
    deleteFromgrant_slicesCollection(filter: { id: { eq: $id } }) {
      affectedCount
    }
  }
`;

export const UPDATE_GRANT_SLICE = gql`
  mutation UpdateGrantSlice($id: Int!, $amount: BigFloat!, $received_date: Datetime!) {
    updategrant_slicesCollection(
      filter: { id: { eq: $id } }
      set: { amount: $amount, received_date: $received_date }
    ) {
      affectedCount
      records {
        id
        amount
        received_date
      }
    }
  }
`;

export const CREATE_GRANT_SLICE = gql`
  mutation CreateGrantSlice(
    $project_id: Int!
    $amount: BigFloat!
    $received_date: Datetime!
    $status: String!
  ) {
    insertIntogrant_slicesCollection(
      objects: {
        project_id: $project_id
        amount: $amount
        received_date: $received_date
        status: $status
      }
    ) {
      records {
        id
        amount
        received_date
        status
        project_id
      }
    }
  }
`;
