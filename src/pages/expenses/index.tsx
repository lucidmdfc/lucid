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
import { Divider } from '@mui/material';
import { OrderListContainer } from 'src/sections/dashboard/order/order-list-container';
import { ChangeEvent, MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDialog } from 'src/hooks/use-dialog';
import { Customer } from 'src/types/template-types/customer';
import { useMounted } from 'src/hooks/use-mounted';
import { customersApi } from 'src/api/customers';
import ExpenseListSearch from './sections/expense-list-search';
import ExpenseDrawer from './sections/expense-drawer';
import ExpenseListTable from './sections/expense-list-table';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';

interface Filters {
  query?: string;
  status?: string;
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
      status: undefined,
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
  members: Customer[];
  membersCount: number;
}
const useMembersStore = (searchState: ExpensesSearchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState<ExpenseStoreState>({
    members: [],
    membersCount: 0,
  });

  const handleOrdersGet = useCallback(async () => {
    try {
      const response = await customersApi.getCustomers(searchState);

      if (isMounted()) {
        setState({
          members: response.data,
          membersCount: response.count,
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
const useCurrentOrder = (members: Customer[], memberId?: string): Customer | undefined => {
  return useMemo((): Customer | undefined => {
    if (!memberId) {
      return undefined;
    }

    return members.find((member) => member.id === memberId);
  }, [members, memberId]);
};

const Page: NextPage = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const expensesSearch = useExpensesSearch();
  const expensesStore = useMembersStore(expensesSearch.state);
  const dialog = useDialog<string>();
  const currentOrder = useCurrentOrder(expensesStore.members, dialog.data);

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted successfully');
  };
  const settings = useSettings();

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
    <Box
      component="main"
      ref={rootRef}
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Box
        ref={rootRef}
        sx={{
          bottom: 0,
          display: 'flex',
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0,
        }}
      >
        <OrderListContainer open={dialog.open}>
          <Box sx={{ p: 1 }}>
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={2}
              sx={{ mx: 5 }}
            >
              <div>
                <Typography variant="h4">Notes de frais</Typography>
              </div>
              <Button
                component={RouterLink}
                href={paths.dashboard.expenses.create}
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
          </Box>

          <Divider />
          <ExpenseListSearch onFiltersChange={expensesSearch.handleFiltersChange} />
          <Divider />
          <ExpenseListTable
            count={expensesStore.membersCount}
            items={expensesStore.members}
            onPageChange={expensesSearch.handlePageChange}
            onRowsPerPageChange={expensesSearch.handleRowsPerPageChange}
            onSelect={handleOrderOpen}
            page={expensesSearch.state.page}
            rowsPerPage={expensesSearch.state.rowsPerPage}
          />
        </OrderListContainer>
        <ExpenseDrawer
          container={rootRef.current}
          onClose={dialog.handleClose}
          open={dialog.open}
          member={currentOrder}
        />
      </Box>
    </Box>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
