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
import { useMounted } from 'src/hooks/use-mounted';
import SalaryListSearch from './sections/salary-list-search';
import SalaryListTable from './sections/salary-list-table';
import SalaryDrawer from './sections/salary-drawer';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';
import { salary } from 'src/types/salary';
import { applyPagination } from 'src/utils/apply-pagination';
import { applySort } from 'src/utils/apply-sort';
import { deepCopy } from 'src/utils/deep-copy';
import { slariesApi } from 'src/api/salaries';

interface Filters {
  query?: string;
  status?: string;
}
type SortDir = 'asc' | 'desc';

interface SalarySearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
  sortBy?: string;
  sortDir?: SortDir;
}

const useSalariesSearch = () => {
  const [state, setState] = useState<SalarySearchState>({
    filters: {
      query: undefined,
      status: undefined,
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: 'createdAt',
    sortDir: 'desc',
  });

  const handleFiltersChange = useCallback((filters: Filters): void => {
    setState((prevState) => ({
      ...prevState,
      filters,
    }));
  }, []);

  const handleSortChange = useCallback((sortDir: SortDir): void => {
    setState((prevState) => ({
      ...prevState,
      sortDir,
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
    handleSortChange,
    handlePageChange,
    handleRowsPerPageChange,
    state,
  };
};
interface SalariesStoreState {
  salaries: salary[];
  salariesCount: number;
}
const useSalariesStore = (searchState: SalarySearchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState<SalariesStoreState>({
    salaries: [],
    salariesCount: 0,
  });

  const handleOrdersGet = useCallback(async () => {
    try {
      const response = await slariesApi.getSalaries(searchState);

      if (isMounted()) {
        setState({
          salaries: response.data,
          salariesCount: response.count,
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

const Page: NextPage = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const salariesSearch = useSalariesSearch();
  const salariesStore = useSalariesStore(salariesSearch.state);
  const dialog = useDialog<string>();
  const currentOrder = useMemo(
    () => salariesStore.salaries.find((salary) => salary.id === dialog.data),
    [salariesStore.salaries, dialog.data]
  );
  const { t } = useTranslation();

  usePageView();

  const handleOrderOpen = useCallback(
    (orderId: string): void => {
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
          <Box sx={{ p: 2 }}>
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={2}
              sx={{ mx: 5 }}
            >
              <div>
                <Typography variant="h4">{t(tokens.nav.salary)}</Typography>
              </div>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={1}
              >
                <Button
                  component={RouterLink}
                  href={paths.dashboard.salary.newPAyement}
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Nouveau virement
                </Button>
                <Button
                  component={RouterLink}
                  href={paths.dashboard.salary.newSalary}
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="outlined"
                >
                  Nouveau salarié(e)
                </Button>
              </Stack>
            </Stack>
          </Box>

          <Divider />
          <SalaryListSearch
            onFiltersChange={salariesSearch.handleFiltersChange}
            sortBy={salariesSearch.state.sortBy}
            sortDir={salariesSearch.state.sortDir}
          />
          <Divider />
          <SalaryListTable
            count={salariesStore.salariesCount}
            salaries={salariesStore.salaries}
            onPageChange={salariesSearch.handlePageChange}
            onRowsPerPageChange={salariesSearch.handleRowsPerPageChange}
            onSelect={handleOrderOpen}
            page={salariesSearch.state.page}
            rowsPerPage={salariesSearch.state.rowsPerPage}
          />
        </OrderListContainer>
        <SalaryDrawer
          container={rootRef.current}
          onClose={dialog.handleClose}
          open={dialog.open}
          salary={currentOrder}
        />
      </Box>
    </Box>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;