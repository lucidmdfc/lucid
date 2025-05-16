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
import { ProductCreateForm } from 'src/sections/dashboard/product/product-create-form';
import EditExpense from 'src/pages/expenses/components/edit-expense';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_EXPENSE_CLAIM } from 'src/graphql/entities/expenseClaims/queries';

const Page: NextPage = () => {
  usePageView();
  const router = useRouter();
  const { expenseId } = router.query;
  // console.log(expenseId);
  const {
    loading: expenseClaimLoading,
    error: expenseClaimError,
    data: expenseClaimData,
    refetch: expenseClaimRefetch,
  } = useQuery(GET_EXPENSE_CLAIM, {
    variables: { id: Number(expenseId) },
  });

  // console.log('expenseClaimData', expenseClaimData);
  const firstNode = expenseClaimData?.expense_claimsCollection?.edges[0]?.node;

  return (
    <>
      <Seo title="Modifier note de frais" />
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
              <Typography variant="h4">Modifier</Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.expenses.index}
                  variant="subtitle2"
                >
                  Notes de frais
                </Link>
              </Breadcrumbs>
            </Stack>

            <EditExpense expenseClaim={firstNode} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
