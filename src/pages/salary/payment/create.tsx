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
import NewPayment from '../components/new-payement';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';

const Page: NextPage = () => {
  usePageView();
  const { t } = useTranslation();

  return (
    <>
      <Seo title="Chatge & dépenses: Nouveau virement" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant="h4">Créer un nouveau virement</Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.salary.index}
                  variant="subtitle2"
                >
                  {t(tokens.nav.salary)}{' '}
                </Link>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                >
                  Nouveau virement
                </Typography>
              </Breadcrumbs>
            </Stack>
            <Container maxWidth="lg">
              <Card>
                <NewPayment></NewPayment>
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
