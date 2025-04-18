import type { ChangeEvent, MouseEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { projectsApi } from 'src/api/projects';
import { GET_PROJECTS, getProjectsWithDonors } from 'src/graphql/entities/projects/queries';
import { useQuery } from '@apollo/client';
import OverviewProjectFromGrants from './components/overview-projects-from-grants';
import { Grid } from '@mui/material';
import { supabase } from 'src/libs/supabaseClient';

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
export const mapProjectData = (raw: any[]): Project[] =>
  raw.map((item) => ({
    id: item.id,
    project_name: item.name || '--',
    email: item.contactEmail || '--', // fallback in case it's not provided
    amount: Number(item.project_budget) || 0,
    totalSliceAmount: item.totalSliceAmount || 0,
    financial_backer: item.funders || [],
    beneficiaries: item.recipients || [],
    created_at: item.created_at ? new Date(item.created_at) : undefined,
    updated_at: item.updated_at ? new Date(item.updated_at) : undefined,
  }));
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
  const projectsSearch = useProjectsSearch();
  // const projectsStore = useProjectsStore(projectsSearch.state);
  // const projectsIds = useProjectIds(projectsStore.projects);
  const settings = useSettings();
  const { t } = useTranslation();
  usePageView();
  const [donorsInProject, setDonorsInProject] = useState<any[]>([]);

  // const {
  //   loading: projectsLoading,
  //   error: projectsError,
  //   data: projectsData,
  //   refetch: projectRefetsh,
  // } = useQuery(GET_PROJECTS);
  // console.log(projectsData?.projectsCollection?.edges);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProjectsWithDonors();
        // console.log(data);
        setDonorsInProject(data);
      } catch (error) {
        console.error('Error fetching projects with donors', error);
      }
    };

    fetchData();
  }, []);
  // console.log(donorsInProject);
  // const nodes = projectsData?.projectsCollection?.edges?.map((edge: any) => edge.node) || [];
  // const mappedData = mapProjectData(nodes);
  // const projectsStore = {
  //   projects: mappedData,
  //   projectsCount: mappedData.length,
  // };

  // console.log(nodes);
  // console.log(mappedData);
  return (
    <>
      <Seo title="Revenus: Gestion projets" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Stack spacing={4}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">{t(tokens.nav.projects_management)}</Typography>
              </Stack>
              <Stack
                alignItems="center"
                direction="row"
                spacing={3}
              >
                <Button
                  component={RouterLink}
                  href={paths.projets.create}
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Nouveau Projet
                </Button>
                {/* <Button
                  component={RouterLink}
                  href={paths.projets.tranche}
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Nouvelle Tranche
                </Button> */}
              </Stack>
            </Stack>

            <Grid
              container
              spacing={3}
            >
              {donorsInProject?.map((grant, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                >
                  <OverviewProjectFromGrants
                    amount={grant.project_budget}
                    name={grant.project_name}
                    id={grant.project_id}
                    donors={grant.donors.length}
                  />
                </Grid>
              ))}
            </Grid>
            {/* <Card>
              <ProjectListSearch onFiltersChange={projectsSearch.handleFiltersChange} />
              <ProjectListTable
                count={projectsStore.projectsCount}
                items={projectsStore.projects}
                onPageChange={projectsSearch.handlePageChange}
                onRowsPerPageChange={projectsSearch.handleRowsPerPageChange}
                page={projectsSearch.state.page}
                rowsPerPage={projectsSearch.state.rowsPerPage}
              />
            </Card> */}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
