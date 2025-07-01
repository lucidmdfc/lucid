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
import GrantListSearch from './sections/grant-list-search';
import GrantListTable from './sections/grant-list-table';
import { paths } from 'src/paths';
import { RouterLink } from 'src/components/router-link';
import { Project } from 'src/types/project';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';
import { projectsApi } from 'src/api/projects';
import {
  useGetGrantProjectAgreementByProjectQuery,
  useGetOneGrantProjectAgreementQuery,
} from 'src/hooks/generatedHook';
import GrantDrawer from './sections/grant-drawer';
import { useDialog } from 'src/hooks/use-dialog';
import MemberListContainer from '../membres/sections/member-list-container';
import { useRouter } from 'next/router';

interface Filters {
  query?: string;
}

interface ProjectsSearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
  sortBy: string;
  sortDir: 'asc' | 'desc';
}

const useProjectsSearch = () => {
  const [state, setState] = useState<ProjectsSearchState>({
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

interface ProjectsStoreState {
  projects: Project[];
  projectsCount: number;
}

const useProjectsStore = (searchState: ProjectsSearchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState<ProjectsStoreState>({
    projects: [],
    projectsCount: 0,
  });

  const handleProjectsGet = useCallback(async () => {
    try {
      const response = await projectsApi.getProjects(searchState);

      if (isMounted()) {
        setState({
          projects: response.data,
          projectsCount: response.count,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [searchState, isMounted]);

  useEffect(
    () => {
      handleProjectsGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState]
  );

  return {
    ...state,
  };
};

const useProjectIds = (projects: Project[] = []) => {
  return useMemo(() => {
    return projects.map((project) => project.id);
  }, [projects]);
};

const Page: NextPage = () => {
  const router = useRouter();
  const { projectId } = router.query;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const projectsSearch = useProjectsSearch();
  const projectsStore = useProjectsStore(projectsSearch.state);
  // const projectsIds = useProjectIds(projectsStore.projects);
  const dialog = useDialog<string>();

  const settings = useSettings();
  const { t } = useTranslation();
  usePageView();

  const {
    loading: grantsLoading,
    error: grantsError,
    data: grantsData,
    refetch: grantsRefetsh,
  } = useGetGrantProjectAgreementByProjectQuery({
    variables: {
      projectId: Number(projectId),
    },
  });

  const {
    loading: grantLoading,
    error: grantError,
    data: grantData,
    refetch: grantRefetsh,
  } = useGetOneGrantProjectAgreementQuery({
    variables: {
      id: Number(dialog.data),
    },
  });
  console.log(grantData);

  const handleMemberOpen = useCallback(
    (grantId: string): void => {
      // Close drawer if is the same order

      if (dialog.open && dialog.data === grantId) {
        dialog.handleClose();
        return;
      }

      dialog.handleOpen(grantId);
    },
    [dialog]
  );
  // console.log(dialog);
  const grants =
    grantsData?.grant_project_agreementCollection?.edges?.map((edge) => edge.node) ?? [];

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
                <Typography variant="h4">{t(tokens.nav.grants_management)}</Typography>
              </Stack>
            </Stack>
          </Box>

          <GrantListSearch onFiltersChange={projectsSearch.handleFiltersChange} />
          <GrantListTable
            count={projectsStore.projectsCount}
            // items={projectsStore.projects}
            items={grants}
            onSelect={handleMemberOpen}
            onPageChange={projectsSearch.handlePageChange}
            onRowsPerPageChange={projectsSearch.handleRowsPerPageChange}
            page={projectsSearch.state.page}
            rowsPerPage={projectsSearch.state.rowsPerPage}
          />
          {/* <Card></Card> */}
          {/* </Stack> */}
        </MemberListContainer>

        {/* </Container> */}
        <GrantDrawer
          container={rootRef.current}
          onClose={dialog.handleClose}
          open={dialog.open}
          // member={singleMemberData?.membersCollection?.edges[0]?.node}
          grant={grantData?.grant_project_agreementCollection?.edges[0]?.node}
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
