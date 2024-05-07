import type { NextPage } from 'next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { Previewer } from 'src/sections/components/previewer';
import { Divider } from '@mui/material';
import NewCash from 'src/pages/cash/components/new-cash-in-form';
import CashStats from './components/cash-stats';
import NewOutCash from 'src/pages/cash/components/new-cash-out-form';
import TableCash from './sections/cash-table';
import { useRef } from 'react';

const Page: NextPage = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const settings = useSettings();

  usePageView();

  return (
    <Box
      component="main"
      ref={rootRef}
      sx={{
        flexGrow: 1,
        py: 4,
      }}
    >
      <Container maxWidth={settings.stretch ? false : 'xl'}>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{ m: 2 }}
        >
          <div>
            <Typography variant="h4">Gestion de caisse</Typography>
          </div>
        </Stack>
        <CashStats />
        <Grid
          container
          xs={12}
          md={12}
          spacing={2}
          maxWidth="xl"
        >
          <Grid
            xs={12}
            md={12}
            lg={6}
          >
            <Container
              sx={{
                paddingX: ' 0 !important',
              }}
            >
              <Previewer title="Nouvelle Entrée">
                <NewCash></NewCash>
              </Previewer>
            </Container>
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={6}
          >
            <Container
              sx={{
                paddingX: '0 !important',
              }}
            >
              <Previewer title="Nouvelle Sortie">
                <NewOutCash></NewOutCash>
              </Previewer>
            </Container>
          </Grid>
        </Grid>
        <TableCash />
      </Container>
    </Box>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
