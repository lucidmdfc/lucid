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
import { useMutation } from '@apollo/client';
import { UPLOAD_FILE } from 'src/graphql/operations/mutations';

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

  const [CreateGrantAgreement] = useCreateGrantAgreementMutation();

  const handleSubmit = async (data: any) => {
    try {
      console.log(data);
      const { data: grantData } = await CreateGrantAgreement({
        variables: {
          donor_id: data.donor,
          project_id: data?.project,
          grant: data.grant.toString(),
          agreement_date: data?.agreementDate,
        },
      });
      const [
        uploadFile,
        { data: uploadFileData, loading: uploadFileLoading, error: uploadFileError },
      ] = useMutation(UPLOAD_FILE);
      // const {
      //   data: { session },
      // } = await supabase.auth.getSession();

      // const accessToken = session?.access_token;
      // // console.log(accessToken);
      // await formikExpenseFile.setFieldValue('expense_category', '');

      // const { data } = await uploadFile({
      //   variables: {
      //     file,
      //     documentCategory: 'expense_claims',
      //     expense_claim_category: formikExpenseFile.values.expense_category,
      //     expense_status: formik.values.status,
      //     expense_claim_id: String(expenseClaim?.expenseClaim?.id),
      //   },
      //   context: {
      //     headers: {
      //       Authorization: `Bearer ${accessToken}`,
      //     },
      //   },
      // });
      toast.success('Nouveau grant créé avec succès !');
      // console.log('Created grant:', grantData);
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
          px: { xs: 2, sm: 4, md: 10, lg: 33 },
          // py: { xs: 4, sm: 6, md: 8 },
        }}
      >
        <GrantAgreementStepper
          projectsLoading={projectsLoading}
          projectsData={projectsData}
          donorsData={donorsData}
          handleSubmit={handleSubmit}
        />
      </Box>
    </Box>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
