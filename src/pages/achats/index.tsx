import type { NextPage } from 'next';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
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
import FilterFunnel01Icon from '@untitled-ui/icons-react/build/esm/FilterFunnel01';
import PurchaseCreateForm from './sections/create-purchase';
import { paths } from 'src/paths';
import { RouterLink } from 'src/components/router-link';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';

const Page: NextPage = () => {
  const { t } = useTranslation();

  usePageView();

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Stack
            alignItems="flex-start"
            direction="row"
            justifyContent="space-between"
            spacing={3}
          >
            <div>
              <Typography variant="h4">{t(tokens.nav.achats)}</Typography>
            </div>

            <Button
              component={RouterLink}
              href={paths.dashboard.achats.search}
              startIcon={
                <SvgIcon>
                  <FilterFunnel01Icon />
                </SvgIcon>
              }
              variant="contained"
            >
              Rechercher{' '}
            </Button>
          </Stack>
          <PurchaseCreateForm />
        </Stack>
      </Container>
    </Box>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;