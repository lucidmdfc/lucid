import { gql } from '@apollo/client';
import { PROJECT_FRAGMENT } from './fragments';

export const CREATE_PROJECT = gql`
  mutation CreateProject(
    $name: String!
    $description: String
    $start_date: date!
    $end_date: date!
    $project_budget: numeric!
    $status: String
    $note: String
    $contact_person_email: String
    $contact_person_name: String
  ) {
    insertIntoprojectsCollection(
      objects: [
        {
          name: $name
          description: $description
          start_date: $start_date
          end_date: $end_date
          project_budget: $project_budget
          status: $status
          note: $note
          contact_person_email: $contact_person_email
          contact_person_name: $contact_person_name
        }
      ]
    ) {
      records {
        ...ProjectFragment
      }
    }
  }
  ${PROJECT_FRAGMENT}
`;
