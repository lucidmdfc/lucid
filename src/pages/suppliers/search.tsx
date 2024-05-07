import type { ChangeEvent, MouseEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import FilterFunnel01Icon from '@untitled-ui/icons-react/build/esm/FilterFunnel01';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';

import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { InvoiceStatus } from 'src/types/invoice';
import PurchaseListTable from './sections/suppliers-payment-state-list';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';
import { SupplierListContainer } from './sections/supplier-list-container';
import { Supplier } from 'src/types/supplier';
import { suppliersApi } from 'src/api/suppliers';
import SupplierFilterSidebar from './sections/supplier-filter-sidebar';
import SupplierAmountSummary from './sections/supplier-amount-summary';

interface Filters {
  providerNames?: string[];
  endDate?: Date;
  query?: string;
  startDate?: Date;
  status?: InvoiceStatus;
}

interface SuppliersSearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
}

const useSuppliersSearch = () => {
  const [state, setState] = useState<SuppliersSearchState>({
    filters: {
      providerNames: [],
      endDate: undefined,
      query: '',
      startDate: undefined,
    },
    page: 0,
    rowsPerPage: 5,
  });

  const handleFiltersChange = useCallback((filters: Filters): void => {
    setState((prevState) => ({
      ...prevState,
      filters,
      page: 0,
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

interface SupplierStoreState {
  supplier: Supplier[];
  suppliersCount: number;
}

const useSuppliersStore = (searchState: SuppliersSearchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState<SupplierStoreState>({
    supplier: [],
    suppliersCount: 0,
  });

  const handleSuppliersGet = useCallback(async () => {
    try {
      const response = await suppliersApi.getSuppliers(searchState);

      if (isMounted()) {
        setState({
          supplier: response.data,
          suppliersCount: response.count,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [searchState, isMounted]);

  useEffect(
    () => {
      handleSuppliersGet();
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
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const suppliersSearch = useSuppliersSearch();
  const suppliersStore = useSuppliersStore(suppliersSearch.state);
  const [group, setGroup] = useState<boolean>(true);
  const [openSidebar, setOpenSidebar] = useState<boolean>(lgUp);

  usePageView();
  const { t } = useTranslation();

  const handleGroupChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setGroup(event.target.checked);
  }, []);

  const handleFiltersToggle = useCallback((): void => {
    setOpenSidebar((prevState) => !prevState);
  }, []);

  const handleFiltersClose = useCallback((): void => {
    setOpenSidebar(false);
  }, []);

  return (
    <>
      <Seo title="Prestataire et fournisseurs" />
      <Divider />
      <Box
        component="main"
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
          <SupplierFilterSidebar
            container={rootRef.current}
            filters={suppliersSearch.state.filters}
            group={group}
            onFiltersChange={suppliersSearch.handleFiltersChange}
            onClose={handleFiltersClose}
            onGroupChange={handleGroupChange}
            open={openSidebar}
          />
          <SupplierListContainer open={openSidebar}>
            <Stack spacing={4}>
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing={3}
              >
                <div>
                  <Typography variant="h4">{t(tokens.nav.suppliers)}</Typography>
                </div>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="primary"
                    variant="contained"
                    startIcon={
                      <SvgIcon>
                        <FilterFunnel01Icon />
                      </SvgIcon>
                    }
                    onClick={handleFiltersToggle}
                  >
                    Recherche
                  </Button>
                </Stack>
              </Stack>
              <SupplierAmountSummary
                count={suppliersStore.suppliersCount}
                items={suppliersStore.supplier}
              />
              <PurchaseListTable
                count={suppliersStore.suppliersCount}
                items={suppliersStore.supplier}
                group={group}
                onPageChange={suppliersSearch.handlePageChange}
                onRowsPerPageChange={suppliersSearch.handleRowsPerPageChange}
                page={suppliersSearch.state.page}
                rowsPerPage={suppliersSearch.state.rowsPerPage}
              />
            </Stack>
          </SupplierListContainer>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
