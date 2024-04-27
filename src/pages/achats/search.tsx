import type { ChangeEvent, MouseEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import FilterFunnel01Icon from '@untitled-ui/icons-react/build/esm/FilterFunnel01';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
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
import PurchaseListTable from './components/purchase-list-table';
import PurchaseListSidebar from './components/purchase-list-sidebar';
import PurchaseListSummary from './components/purchase-list-summary';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';
import { provider } from 'src/types/provider';
import { providersApi } from 'src/api/providers';
import PurchaseListContainer from './components/purchase-list-container';

interface Filters {
  providerNames?: string[];
  endDate?: Date;
  query?: string;
  startDate?: Date;
  status?: InvoiceStatus;
}

interface ProvidersSearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
}

const useProvidersSearch = () => {
  const [state, setState] = useState<ProvidersSearchState>({
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

interface ProviderStoreState {
  providers: provider[];
  providersCount: number;
}

const useInvoicesStore = (searchState: ProvidersSearchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState<ProviderStoreState>({
    providers: [],
    providersCount: 0,
  });

  const handleProvidersGet = useCallback(async () => {
    try {
      const response = await providersApi.getProviders(searchState);

      if (isMounted()) {
        setState({
          providers: response.data,
          providersCount: response.count,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [searchState, isMounted]);

  useEffect(
    () => {
      handleProvidersGet();
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
  const providersSearch = useProvidersSearch();
  const providersStore = useInvoicesStore(providersSearch.state);
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
      <Seo title=" Factures" />
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
          <PurchaseListSidebar
            container={rootRef.current}
            filters={providersSearch.state.filters}
            group={group}
            onFiltersChange={providersSearch.handleFiltersChange}
            onClose={handleFiltersClose}
            onGroupChange={handleGroupChange}
            open={openSidebar}
          />
          <PurchaseListContainer open={openSidebar}>
            <Stack spacing={4}>
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing={3}
              >
                <div>
                  <Typography variant="h4">{t(tokens.nav.achats)}</Typography>
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
              <PurchaseListSummary
                count={providersStore.providersCount}
                items={providersStore.providers}
              />
              <PurchaseListTable
                count={providersStore.providersCount}
                items={providersStore.providers}
                group={group}
                onPageChange={providersSearch.handlePageChange}
                onRowsPerPageChange={providersSearch.handleRowsPerPageChange}
                page={providersSearch.state.page}
                rowsPerPage={providersSearch.state.rowsPerPage}
              />
            </Stack>
          </PurchaseListContainer>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
