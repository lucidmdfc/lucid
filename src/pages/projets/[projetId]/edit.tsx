import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { customersApi } from 'src/api/customers';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { paths } from 'src/paths';
import type { Customer } from 'src/types/template-types/customer';
import { getInitials } from 'src/utils/get-initials';
import { Breadcrumbs, Card } from '@mui/material';
import { BreadcrumbsSeparator } from 'src/components/breadcrumbs-separator';
import { Project } from 'src/types/project';
import { useRouter } from 'next/router';
import EditProject from '../components/edit-project-form';

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

const Page: NextPage = () => {
  const router = useRouter();
  const { projetId } = router.query;

  // Ensure projetId is a string or an array of strings
  const projectIds: string[] = Array.isArray(projetId) ? projetId : [projetId || ''];

  // Assuming useProject expects a single string, you can take the first element
  const projectIdToUse: string = projectIds[0] || '';

  // Unconditionally call the hook
  const project = useProject(projectIdToUse);

  usePageView();

  if (!project) {
    return null;
  }

  return (
    <>
      <Seo title="Projets: Modifier le projet" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={'lg'}>
          <Stack spacing={3}>
            <Stack spacing={2}>
              <Typography variant="h4">Modifier le projet </Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.projets.index}
                  variant="subtitle2"
                >
                  Gestion projets
                </Link>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.projets.details.replace(':projetId', project?.id)}
                  variant="subtitle2"
                >
                  Détails du projet
                </Link>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                >
                  Modifier projet
                </Typography>
              </Breadcrumbs>
            </Stack>
            <Container maxWidth="lg">
              <Card>
                <EditProject project={project} />
              </Card>
            </Container>{' '}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
