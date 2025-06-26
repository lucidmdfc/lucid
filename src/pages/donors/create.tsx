import type { NextPage } from 'next';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { BreadcrumbsSeparator } from 'src/components/breadcrumbs-separator';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { paths } from 'src/paths';
import { Card } from '@mui/material';
import NewDonorForm from './components/create-donor-form';

const Page: NextPage = () => {
  usePageView();

  return (
    <>
      <Seo title="Revenus: Créer un nouveau projet" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <Stack spacing={2}>
              <Typography variant="h4">Créer un nouveau Bailleur</Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.donors.index}
                  variant="subtitle2"
                >
                  Gestion Bailleur
                </Link>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                >
                  Nouveau Bailleur
                </Typography>
              </Breadcrumbs>
            </Stack>
            <Container maxWidth="lg">
              <Card>
                <NewDonorForm></NewDonorForm>
              </Card>
            </Container>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
