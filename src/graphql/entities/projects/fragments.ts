import { gql } from '@apollo/client';

export const PROJECT_FRAGMENT = gql`
  fragment ProjectFragment on projects {
    id
    name
    description
    start_date
    end_date
    project_budget
    created_at
    updated_at
    status
    note
    contact_person_email
    contact_person_name
  }
`;
