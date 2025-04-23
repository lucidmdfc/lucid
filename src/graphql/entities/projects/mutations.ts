import { gql } from '@apollo/client';
import { PROJECT_FRAGMENT } from './fragments';

export const CREATE_PROJECT = gql`
  mutation CreateProject(
    $name: String!
    $description: String
    $start_date: Date!
    $end_date: Date!
    $project_budget: BigFloat!
    $status: Boolean
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
export const UPDATE_PROJECT = gql`
  mutation UpdateProject($set: projectsUpdateInput!, $filter: projectsFilter, $atMost: Int!) {
    updateprojectsCollection(set: $set, filter: $filter, atMost: $atMost) {
      records {
        id
        name
        description
        start_date
        end_date
        project_budget
        status
        note
        contact_person_email
        contact_person_name
      }
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: Int!) {
    deleteFromprojectsCollection(filter: { id: { eq: $id } }) {
      affectedCount
    }
  }
`;
