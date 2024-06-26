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
import { Previewer } from 'src/sections/components/previewer';
import NewUtilities from './components/new-utilities';

const Page: NextPage = () => {
  const settings = useSettings();

  usePageView();

  return (
    <>
      <Seo title="Charger & Dépenses: Utilities " />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Stack
            direction="row"
            justifyContent="start"
            spacing={4}
            sx={{
              flexGrow: 1,
              py: 1,
            }}
          >
            <Typography variant="h4">Utilities</Typography>
          </Stack>
          <Grid
            container
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid
              xs={12}
              md={12}
            >
              <Container maxWidth="lg">
                <Previewer title="Nouvelles dépenses">
                  <NewUtilities></NewUtilities>
                </Previewer>
              </Container>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
