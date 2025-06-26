import type { ChangeEvent, MouseEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { NextPage } from 'next';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { useSettings } from 'src/hooks/use-settings';
import ProjectListSearch from './sections/Project-list-search';
import ProjectListTable from './sections/project-list-table';
import { paths } from 'src/paths';
import { RouterLink } from 'src/components/router-link';
import { Project } from 'src/types/project';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';
import { useGetDonorByIdQuery, useGetDonorsQuery } from 'src/hooks/generatedHook';
import DonorsDrawer from './sections/donors-drawer';
import { useDialog } from 'src/hooks/use-dialog';
import MemberListContainer from '../membres/sections/member-list-container';

interface Filters {
  query?: string;
}

interface donorsSearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
  sortBy: string;
  sortDir: 'asc' | 'desc';
}

const usedonorsSearch = () => {
  const [state, setState] = useState<donorsSearchState>({
    filters: {
      query: undefined,
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: 'project_name',
    sortDir: 'desc',
  });

  const handleFiltersChange = useCallback((filters: Filters): void => {
    setState((prevState) => ({
      ...prevState,
      filters,
    }));
  }, []);

  const handleSortChange = useCallback(
    (sort: { sortBy: string; sortDir: 'asc' | 'desc' }): void => {
      setState((prevState) => ({
        ...prevState,
        sortBy: sort.sortBy,
        sortDir: sort.sortDir,
      }));
    },
    []
  );

  const handlePageChange = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, page: number): void => {
      console.log(page);
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

interface donorsStoreState {
  donors: Project[];
  donorsCount: number;
}

// const usedonorsStore = (searchState: donorsSearchState) => {
//   const isMounted = useMounted();
//   const [state, setState] = useState<donorsStoreState>({
//     donors: [],
//     donorsCount: 0,
//   });

//   const handledonorsGet = useCallback(async () => {
//     try {
//       const response = await donorsApi.getdonors(searchState);

//       if (isMounted()) {
//         setState({
//           donors: response.data,
//           donorsCount: response.count,
//         });
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }, [searchState, isMounted]);

//   useEffect(
//     () => {
//       handledonorsGet();
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [searchState]
//   );

//   return {
//     ...state,
//   };
// };

const useProjectIds = (donors: Project[] = []) => {
  return useMemo(() => {
    return donors.map((project) => project.id);
  }, [donors]);
};

const Page: NextPage = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const donorsSearch = usedonorsSearch();
  // const donorsStore = usedonorsStore(donorsSearch.state);
  // const donorsIds = useProjectIds(donorsStore.donors);
  const dialog = useDialog<string>();
  const settings = useSettings();
  const { t } = useTranslation();
  usePageView();
  const {
    loading: donorsLoading,
    error: donorsError,
    data: donorsData,
    refetch: donorsRefetsh,
  } = useGetDonorsQuery();

  const {
    loading: donorLoading,
    error: donorError,
    data: donorData,
    refetch: donorRefetsh,
  } = useGetDonorByIdQuery({
    variables: {
      id: Number(dialog.data),
    },
  });

  const donorsNode = donorData?.donorsCollection?.edges?.map((edge) => edge.node) ?? [];
  const donor = donorsNode[0] || null;

  const handleMemberOpen = useCallback(
    (memberId: string): void => {
      // Close drawer if is the same order

      if (dialog.open && dialog.data === memberId) {
        dialog.handleClose();
        return;
      }

      dialog.handleOpen(memberId);
    },
    [dialog]
  );
  console.log(dialog);
  const donors = donorsData?.donorsCollection?.edges?.map((edge) => edge.node) ?? [];

  return (
    <>
      <Seo title="Revenus: Gestion projets" />
      <Box
        component="main"
        // sx={{
        //   flexGrow: 1,
        //   py: 8,
        // }}
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* <Container maxWidth={settings.stretch ? false : 'xl'}> */}
        <MemberListContainer open={dialog.open}>
          {/* <Stack spacing={4}> */}
          <Box sx={{ p: 3 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">{t(tokens.nav.donors_management)}</Typography>
              </Stack>
              <Stack
                alignItems="center"
                direction="row"
                spacing={3}
              >
                <Button
                  component={RouterLink}
                  href={paths.donors.create}
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Nouveau bailleur
                </Button>
              </Stack>
            </Stack>
          </Box>

          <ProjectListSearch onFiltersChange={donorsSearch.handleFiltersChange} />
          <ProjectListTable
            // count={donorsStore.donorsCount}
            // items={donorsStore.donors}
            items={donors}
            onSelect={handleMemberOpen}
            onPageChange={donorsSearch.handlePageChange}
            onRowsPerPageChange={donorsSearch.handleRowsPerPageChange}
            page={donorsSearch.state.page}
            rowsPerPage={donorsSearch.state.rowsPerPage}
          />
          {/* <Card></Card> */}
          {/* </Stack> */}
        </MemberListContainer>

        {/* </Container> */}
        <DonorsDrawer
          container={rootRef.current}
          onClose={dialog.handleClose}
          open={dialog.open}
          // member={singleMemberData?.membersCollection?.edges[0]?.node}
          donor={donorData?.donorsCollection?.edges[0]?.node}
          onUpdateMember={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
