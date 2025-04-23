import { gql } from '@apollo/client';
import { PROJECT_FRAGMENT } from './fragments';
import { supabase } from 'src/libs/supabaseClient';

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
  query GetProjectById($id: Int!) {
    projectsCollection(filter: { id: { eq: $id } }, first: 1) {
      edges {
        node {
          ...ProjectFragment
        }
      }
    }
  }
  ${PROJECT_FRAGMENT}
`;

export const getProjectsWithDonors = async () => {
  const { data, error } = await supabase.rpc('get_project_donors');
  if (error) throw error;
  return data;
};

export const getProjectsWithDonorsByProjectId = async (p_project_id: string) => {
  const { data, error } = await supabase.rpc('get_project_donors_by_project_id', {
    p_project_id,
  });
  if (error) throw error;
  return data;
};
