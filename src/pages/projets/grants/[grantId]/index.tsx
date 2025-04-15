import type { NextPage } from 'next';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';
import GrantDetails from '../components/grants-details';
import ProjectDetails from '../../components/project-details';
import { AnalyticsGrantDonors } from '../components/analytics-grant-donors';

const Page: NextPage = () => {
  const router = useRouter();
  const { grantId } = router.query;

  return (
    <Grid
      container
      spacing={3}
      sx={{ padding: '0 20px' }}
    >
      <Grid
        item
        xs={12}
        md={6}
      >
        <ProjectDetails
          name="Green Energy Project"
          description="A project aimed at implementing solar power solutions in rural areas."
          start_date="2024-01-10"
          end_date="2024-12-20"
          project_budget={1500000}
          status="In Progress"
          note="Next milestone: complete installation in Region A by May."
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
      >
        <GrantDetails
          totalAmount={'120000'}
          agreementDate="2024-03-15T15:45:00Z"
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
      >
        <AnalyticsGrantDonors
          chartSeries={[50, 20, 30]}
          labels={['Stats 1', 'Stats 2', 'Stats 3']}
        />
      </Grid>
    </Grid>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
