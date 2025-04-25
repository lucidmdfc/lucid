import type { NextPage } from 'next';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { Card, Container, Divider } from '@mui/material';
import { ChangeEvent, MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDialog } from 'src/hooks/use-dialog';
import { useMounted } from 'src/hooks/use-mounted';
import ExpenseListSearch from './sections/expense-list-search';
import ExpenseListTable from './sections/expense-list-table';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import { expense } from 'src/types/expense';
import { expensesApi } from 'src/api/expenses';
import { Seo } from 'src/components/seo';
import { useQuery } from '@apollo/client';
import { GET_EXPENSE_CLAIMS } from 'src/graphql/entities/expenseClaims/queries';
import { ExpenseClaimFragmentFragment } from 'src/types/generatedTypes';

interface Filters {
  query?: string;
}

interface ExpensesSearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
}
const useExpensesSearch = () => {
  const [state, setState] = useState<ExpensesSearchState>({
    filters: {
      query: undefined,
    },
    page: 0,
    rowsPerPage: 5,
  });

  const handleFiltersChange = useCallback((filters: Filters): void => {
    setState((prevState) => ({
      ...prevState,
      filters,
    }));
  }, []);

  const handlePageChange = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, page: number): void => {
      setState((prevState) => ({
        ...prevState,
        page,
      }));
    },
    []
  );

  const handleRowsPerPageChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setState((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10),
    }));
  }, []);

  return {
    handleFiltersChange,
    handlePageChange,
    handleRowsPerPageChange,
    state,
  };
};
interface ExpenseStoreState {
  expenses: expense[];
  expensesCount: number;
}
const useExpensesStore = (searchState: ExpensesSearchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState<ExpenseStoreState>({
    expenses: [],
    expensesCount: 0,
  });

  const handleOrdersGet = useCallback(async () => {
    try {
      const response = await expensesApi.getExpenses(searchState);

      if (isMounted()) {
        setState({
          expenses: response.data,
          expensesCount: response.count,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [searchState, isMounted]);

  useEffect(
    () => {
      handleOrdersGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState]
  );

  return {
    ...state,
  };
};
const useCurrentOrder = (expenses: expense[], expenseId?: string): expense | undefined => {
  return useMemo((): expense | undefined => {
    if (!expenseId) {
      return undefined;
    }

    return expenses.find((expense) => expense.id === expenseId);
  }, [expenses, expenseId]);
};

const Page: NextPage = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const expensesSearch = useExpensesSearch();
  const expensesStore = useExpensesStore(expensesSearch.state);
  const dialog = useDialog<string>();
  const currentOrder = useCurrentOrder(expensesStore.expenses, dialog.data);
  const settings = useSettings();
  const {
    loading: expeseClaimsLoading,
    error: expeseClaimsError,
    data: expeseClaimsData,
    refetch: expeseClaimsRefetch,
  } = useQuery(GET_EXPENSE_CLAIMS);
  // console.log(expeseClaimsData?.expense_claimsCollection?.edges);
  const nodes = expeseClaimsData?.expense_claimsCollection?.edges.map((edge: any) => {
    const node: any = edge.node;
    return node;
  }) as ExpenseClaimFragmentFragment[];
  // console.log('nodes', nodes);
  usePageView();
  const handleOrderOpen = useCallback(
    (orderId: string): void => {
      // Close drawer if is the same order

      if (dialog.open && dialog.data === orderId) {
        dialog.handleClose();
        return;
      }

      dialog.handleOpen(orderId);
    },
    [dialog]
  );
  return (
    <>
      <Seo title="Charge & dépenses: Note de frais" />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Stack
            alignItems="flex-start"
            direction="row"
            justifyContent="space-between"
            spacing={4}
            mb={3}
          >
            <div>
              <Typography variant="h4">Notes de frais</Typography>
            </div>
            <Button
              component={RouterLink}
              href={paths.expenses.create}
              startIcon={
                <SvgIcon>
                  <PlusIcon />
                </SvgIcon>
              }
              variant="contained"
            >
              Déclarer
            </Button>
          </Stack>
          <Card>
            <ExpenseListSearch onFiltersChange={expensesSearch.handleFiltersChange} />
            <Divider />
            <ExpenseListTable
              count={expensesStore.expensesCount}
              items={nodes}
              expensesRefetch={expeseClaimsRefetch}
              onPageChange={expensesSearch.handlePageChange}
              onRowsPerPageChange={expensesSearch.handleRowsPerPageChange}
              onSelect={handleOrderOpen}
              page={expensesSearch.state.page}
              rowsPerPage={expensesSearch.state.rowsPerPage}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
