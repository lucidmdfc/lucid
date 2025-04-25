import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { customersApi } from 'src/api/customers';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { paths } from 'src/paths';
import ProjectDetails from '../sections/project-details';
import SlicesListTable from '../sections/slice-list-table';
import { Project } from 'src/types/project';
import { useRouter } from 'next/router';
import { slice } from 'src/types/slice';
import Plus from '@untitled-ui/icons-react/build/esm/Plus';
import { slicesApi } from 'src/api/slices';

const tabs = [
  { label: 'Détails', value: 'details' },
  { label: 'Tranches', value: 'slices' },
];

const useProject = (projectId: string): Project | null => {
  const [project, setProject] = useState<Project | null>(null);

  const handleProjectGet = useCallback(async () => {
    try {
      // Retrieve projects from local storage
      const storedProjects = localStorage.getItem('projects');
      const existingProjects = storedProjects ? JSON.parse(storedProjects) : [];

      // Find the project with the specified ID
      const project = existingProjects.find((proj: Project) => proj?.id === projectId);

      // Handle the project accordingly
      if (project) {
        console.log('Project found:', project);
        // Handle further actions with the project
        setProject(project);
      } else {
        console.log('Project not found');
        // Handle the case where project is not found
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      // Handle the error
    }
  }, [projectId]);

  useEffect(() => {
    handleProjectGet();
  }, [projectId, handleProjectGet]);

  return project;
};

const useSlices = (projectId: string) => {
  const isMounted = useMounted();
  const [slices, setSlices] = useState<slice[]>([]);
  const [totalSlicesAmounts, setTotalSlicesAmounts] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const handleSlicesGet = useCallback(async () => {
    try {
      setLoading(true);

      // Retrieve slices from local storage
      const response = await slicesApi.getSlices();
      // Filter slices based on the provided projectId
      const slicesForProject = response.data.filter(
        (slice: slice) => slice.project_id === projectId
      );

      setSlices(slicesForProject);
      setTotalSlicesAmounts(0);
      console.log('Slices for project with ID ' + projectId + ':', slicesForProject);
    } catch (error) {
      console.error('Error fetching slices:', error);
    } finally {
      setLoading(false);
    }
  }, [projectId, isMounted]);

  useEffect(() => {
    handleSlicesGet();
  }, [projectId, handleSlicesGet]);

  const handleSliceDelete = useCallback(() => {
    handleSlicesGet();
  }, [handleSlicesGet]);

  const handleSliceUpdate = useCallback(() => {
    handleSlicesGet();
  }, [handleSlicesGet]);

  return { slices, totalSlicesAmounts, loading, handleSliceDelete, handleSliceUpdate };
};

const Page: NextPage = () => {
  const [currentTab, setCurrentTab] = useState<string>('details');
  const router = useRouter();
  const { projetId } = router.query;

  // Ensure projetId is a string or an array of strings
  const projectIds: string[] = Array.isArray(projetId) ? projetId : [projetId || ''];

  // Assuming useProject expects a single string, you can take the first element
  const projectIdToUse: string = projectIds[0] || '';

  // Unconditionally call the hook
  const project = useProject(projectIdToUse);
  const slicesData = useSlices(Array.isArray(projetId) ? projetId[0] : projetId || '');

  usePageView();

  const handleTabsChange = useCallback((event: ChangeEvent<any>, value: string): void => {
    setCurrentTab(value);
  }, []);

  return (
    <>
      <Seo title="Revenus: Détails du projet" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack spacing={4}>
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.projets.index}
                  sx={{
                    alignItems: 'center',
                    display: 'inline-flex',
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2">Projets</Typography>
                </Link>
              </div>
              <Stack
                alignItems="flex-start"
                direction={{
                  xs: 'column',
                  md: 'row',
                }}
                justifyContent="space-between"
                spacing={4}
              >
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                  <Stack spacing={1}>
                    <Typography variant="h4">{project?.project_name}</Typography>
                  </Stack>
                </Stack>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                  {' '}
                  <Button
                    component={RouterLink}
                    href={paths.projets.tranche}
                    startIcon={
                      <SvgIcon>
                        <Plus />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Nouvelle Tranche
                  </Button>
                  {project?.id && (
                    <Button
                      color="warning"
                      variant="outlined"
                      component={RouterLink}
                      endIcon={
                        <SvgIcon>
                          <Edit02Icon />
                        </SvgIcon>
                      }
                      href={
                        (project.id ? paths.projets.edit.replace(':projetId', project.id) : '') ||
                        '#'
                      }
                    >
                      Modifier le projet
                    </Button>
                  )}
                </Stack>
              </Stack>
              <div>
                <Tabs
                  indicatorColor="primary"
                  onChange={handleTabsChange}
                  scrollButtons="auto"
                  sx={{ mt: 3 }}
                  textColor="primary"
                  value={currentTab}
                  variant="scrollable"
                >
                  {tabs.map((tab) => (
                    <Tab
                      key={tab.value}
                      label={tab.label}
                      value={tab.value}
                    />
                  ))}
                </Tabs>
                <Divider />
              </div>
            </Stack>
            {currentTab === 'details' && (
              <div>
                <Grid
                  container
                  spacing={4}
                >
                  <Grid
                    xs={12}
                    lg={12}
                  >
                    <Stack spacing={4}>
                      {project && (
                        <ProjectDetails
                          loading={slicesData?.loading || false}
                          project={project}
                        />
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </div>
            )}
            {currentTab === 'slices' && (
              <SlicesListTable
                slices={slicesData?.slices || []}
                total={slicesData?.totalSlicesAmounts || 0}
                onRefresh={slicesData?.handleSliceDelete || (() => {})}
                onUpdate={slicesData?.handleSliceUpdate || (() => {})}
                projectId={project?.id || ''}
                loading={slicesData?.loading || false}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
