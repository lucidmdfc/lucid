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
import PurchaseUpdateForm from './components/edit-supplier-form';

const Page: NextPage = () => {
  usePageView();

  return (
    <>
      <Seo title="Prestataire & fournisseurs: Modifier facture" />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant="h4">Modifier </Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.suppliers.search}
                  variant="subtitle2"
                >
                  Prestataire et fournisseurs
                </Link>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                >
                  0000
                </Typography>
              </Breadcrumbs>
            </Stack>
            <PurchaseUpdateForm />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
