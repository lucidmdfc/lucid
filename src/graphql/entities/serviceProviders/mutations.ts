import { gql } from '@apollo/client';
import { SERVICE_PROVIDER_FRAGMENT } from './fragments';

export const CREATE_SERVICE_PROVIDER = gql`
  mutation CreateServiceProvider(
    $name: String!
    $email: String
    $phone: String
    $ice: String
    $depositedDate: timestamptz
    $dueDate: timestamptz
    $amount: numeric
    $status_id: Int
    $project_id: Int
    $payment_method: Int
    $comment: Int
  ) {
    insertIntoservice_providersCollection(
      objects: {
        name: $name
        email: $email
        phone: $phone
        ice: $ice
        depositedDate: $depositedDate
        dueDate: $dueDate
        amount: $amount
        status_id: $status_id
        project_id: $project_id
        payment_method: $payment_method
        comment: $comment
      }
    ) {
      records {
        ...ServiceProviderFragment
      }
    }
  }
  ${SERVICE_PROVIDER_FRAGMENT}
`;
