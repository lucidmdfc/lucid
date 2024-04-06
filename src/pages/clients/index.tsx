import type { NextPage } from 'next';
import { addDays, formatDistanceToNowStrict, subDays, subHours, subMinutes } from 'date-fns';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';

import { Card, CardHeader, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';
import NewClientForm from 'src/pages/clients/components/new-client';

const now = new Date();

const Page: NextPage = () => {
  const settings = useSettings();
  const { t } = useTranslation();
  usePageView();

  return (
    <>
      <Seo title="Revenus: Gestion clients" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 1,
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
              <Box sx={{ p: 3 }}>
                <Stack
                  alignItems="flex-start"
                  direction="row"
                  justifyContent="space-between"
                  spacing={4}
                  sx={{ mx: 5 }}
                >
                  <div>
                    <Typography variant="h4">{t(tokens.nav.clients_management)}</Typography>
                  </div>
                </Stack>
              </Box>
            </Grid>
            <Grid xs={12}>
              <Container maxWidth="xl">
                <Card>
                  <CardHeader title="Nouveau client" />
                  <Divider />
                  <NewClientForm></NewClientForm>
                </Card>
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
