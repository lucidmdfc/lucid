import type { NextPage } from 'next';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';
import GrantDetails from '../components/grants-details';
import ProjectDetails from '../../components/project-details';
import { getProjectsWithDonorsByProjectId } from 'src/graphql/entities/projects/queries';
import { useEffect, useState } from 'react';
import SlicesListTable from '../../sections/slice-list-table';
import { Box } from '@mui/system';
import { useMutation, useQuery } from '@apollo/client';
import DonorstDetails from '../../donors/components/donors-details';
import AnalyticsGrantDonors from '../../donors/components/analytics-grant-donors';
import { DELETE_DONOR } from 'src/graphql/entities/donors/mutations';
import { useDeleteDonorMutation, useGetGrantsByProjectIdQuery } from 'src/hooks/generatedHook';
const Page: NextPage = () => {
  const router = useRouter();
  const { projectID } = router.query;
  const [donorInProject, setDonorInProject] = useState<any[]>([]);
  const {
    loading: grantsSliceLoading,
    error: grantsSliceError,
    data: grantsSliceData,
    refetch: grantsSliceRefetsh,
  } = useGetGrantsByProjectIdQuery({
    variables: {
      projectId: projectID ? Number(projectID) : 0,
    },
  });
  
  
  // const [deleteDonorSlice, { loading: deleteDonorLoading, error: deleteDonorError }] =
  //   useDeleteDonorMutation({
  //     variables: { id: donorInProject[0]?.donors?.[0].id },
  //   });

  const grantSlicesNodes =
    grantsSliceData?.grant_slicesCollection?.edges?.map((edge: any) => edge.node) || [];
  // console.log(grantsSliceData);
  // console.log(grantSlicesNodes);
  useEffect(() => {
    if (!projectID) return;
    const fetchData = async () => {
      try {
        const data = await getProjectsWithDonorsByProjectId(projectID as string);
        setDonorInProject(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching projects with donors', error);
      }
    };

    fetchData();
  }, [projectID]);
  console.log(donorInProject);

  const handleDonorDelete = async () => {
    console.log('Delete donor with id:', donorInProject[0]?.donors?.[0].id);
  };
  return (
    <Box sx={{ padding: '0 70px' }}>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={12}
          md={6}
        >
          {donorInProject.map((item, idx) => (
            <ProjectDetails
              key={item?.id || idx}
              id={item?.project_id}
              name={item?.project_name}
              description={item?.description}
              start_date={item?.start_date}
              end_date={item?.end_date}
              project_budget={item?.project_budget}
              status={item?.status ? 'Active' : 'Not active'}
              note={item?.note || 'No note available'}
            />
          ))}
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <GrantDetails
            totalAmount={String(donorInProject[0]?.grants?.[0]?.grant_amount) || 'No amount'}
            agreementDate={donorInProject[0]?.grants?.[0]?.agreement_date || 'No agreement date'}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <DonorstDetails
            id={donorInProject[0]?.donors?.[0].id}
            donorName={donorInProject[0]?.donors?.[0].name}
            email={donorInProject[0]?.donors?.[0].email}
            phone={donorInProject[0]?.donors?.[0].phone}
            note={donorInProject[0]?.donors?.[0].note}
            onDelete={handleDonorDelete}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <AnalyticsGrantDonors
            chartSeries={donorInProject[0]?.donors?.map((donor: any) => donor.grant_amount) || []}
            labels={
              donorInProject[0]?.donors?.map(
                (donor: any) => `${donor.name} (${donor.grant_amount}MAD)`
              ) || []
            }
          />
        </Grid>
      </Grid>
      <Box sx={{ paddingTop: '20px' }}>
        <SlicesListTable
          projectId={projectID as string}
          loading={grantsSliceLoading}
          slices={grantSlicesNodes}
          onRefresh={grantsSliceRefetsh}
          onUpdate={function (): void {
            throw new Error('Function not implemented.');
          }}
          total={2}
        />
      </Box>
    </Box>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
