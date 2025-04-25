import type { NextPage } from 'next';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
// import { useMutation, useQuery } from '@apollo/client';
// import { GET_PROJECTS } from 'src/graphql/entities/projects/queries';
// import { GET_DONORS } from 'src/graphql/entities/donors/queries';
// import { CREATE_GRANT_AGREEMENT } from 'src/graphql/entities/grantProjectAgreement/mutations';
// import { CREATE_PROJECT } from 'src/graphql/entities/projects/mutations';
// import { CREATE_DONOR } from 'src/graphql/entities/donors/mutations';
import toast from 'react-hot-toast';
import GrantAgreementStepper from './components/create-grant-stepper';
import {
  useCreateDonorMutation,
  useCreateGrantAgreementMutation,
  useCreateProjectMutation,
  useGetDonorsQuery,
  useGetProjectsQuery,
} from 'src/hooks/generatedHook';

// possible enhancement for the stepper:
//projects/
// ├── components/
// │   ├── create-grant-stepper/       # Main stepper logic
// │   │   ├── index.tsx              # Orchestrator (active step, navigation)
// │   │   ├── steps/                 # Individual step UIs
// │   │   │   ├── BasicInfoStep.tsx
// │   │   │   ├── FundingStep.tsx......

const Page: NextPage = () => {
  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
    refetch: projectRefetch,
  } = useGetProjectsQuery();
  const {
    loading: donorsLoading,
    error: donorsError,
    data: donorsData,
    refetch: donorsRefetch,
  } = useGetDonorsQuery();

  const [CreateProject] = useCreateProjectMutation();
  const [CreateDonor] = useCreateDonorMutation();

  const handleCreateProject = async (variables: any) => {
    // console.log('variables', variables);
    try {
      const { data } = await CreateProject({
        variables: {
          name: variables.name,
          description: variables.description,
          start_date: variables.start_date,
          end_date: variables.end_date,
          project_budget: variables.project_budget.toString(),
          contact_person_email: variables.contact_person_email,
          contact_person_name: variables.contact_person_name,
          status: variables.status,
          note: variables.note,
        },
      });
      // console.log(data);
      toast.success('Nouveau projet créé avec succès !');
    } catch (error) {
      console.log('error', error);
      toast.error('Erreur lors de la création un nouveau projet!');
    }
  };

  const handleCreateDonor = async (variables: any) => {
    try {
      const { data } = await CreateDonor({
        variables: {
          name: variables.name,
          email: variables.email,
          phone: variables.phone,
          note: variables.note,
        },
      });
      toast.success('Nouveau bailleur créé avec succès !');
    } catch (error) {
      toast.error('Erreur lors de la création un nouveau bailleur!');
      // toast.error(error.message);
      console.log('error', error);
    }
  };

  const [CreateGrantAgreement] = useCreateGrantAgreementMutation();

  const handleSubmit = async (data: any) => {
    try {
      for (const d of data.donors) {
        const { data: grantData } = await CreateGrantAgreement({
          variables: {
            donor_id: d.id,
            project_id: data?.project,
            grant: d.amount.toString(),
            agreement_date: data?.agreementDate,
          },
        });
        toast.success('Nouveau grant créé avec succès !');
        // console.log('Created grant:', grantData);
      }
    } catch (error) {
      console.error('Error creating grants:', error);
      toast.error('Erreur lors de la création un nouveau grant!');
    }
  };

  return (
    <Box sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
      <Box sx={{ px: { xs: 2, sm: 4, md: 8, lg: 18 } }}>
        <Typography
          variant="h4"
          gutterBottom
          pb={2}
        >
          Créer un nouveau Grant
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          px: { xs: 2, sm: 4, md: 8, lg: 36 },
          // py: { xs: 4, sm: 6, md: 8 },
        }}
      >
        <GrantAgreementStepper
          projectsLoading={projectsLoading}
          projectsData={projectsData}
          projectRefetch={projectRefetch}
          donorsData={donorsData}
          donorsRefetch={donorsRefetch}
          handleCreateProject={handleCreateProject}
          handleCreateDonor={handleCreateDonor}
          handleSubmit={handleSubmit}
        />
      </Box>
    </Box>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
