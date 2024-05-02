import type { NextPage } from 'next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import DashboardStats from 'src/sections/components/quick-stats/dashboard-quick-stats';
import { useTranslation } from 'react-i18next';
import AllExpenses from 'src/sections/components/tables/all-expenses-table';
import UnpaidExpenses from 'src/sections/components/tables/unpaid-expenses-table';

const Page: NextPage = () => {
  const settings = useSettings();
  const { t } = useTranslation();

  usePageView();

  return (
    <>
      <Seo title="Tableau de bord" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Typography variant="h4">Tableau de bord</Typography>
                </div>
              </Stack>
            </Grid>
            <Grid xs={12}>
              <Stack
                spacing={{
                  xs: 3,
                  lg: 3,
                }}
              >
                <DashboardStats />
              </Stack>
            </Grid>
            <Grid xs={8}>
              <AllExpenses />
            </Grid>
            <Grid xs={4}>
              <UnpaidExpenses />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
