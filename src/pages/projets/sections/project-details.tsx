import type { FC } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';

import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';
import ProjectDeleteManage from './project-delete-management';
import { LinearProgress, Typography } from '@mui/material';
import numeral from 'numeral';
import { GetProjectsQuery } from 'src/types/generatedTypes';
import { SeverityPill } from 'src/components/severity-pill';
// import type { Project } from 'src/types/project';
type Project = NonNullable<
  NonNullable<GetProjectsQuery['projectsCollection']>['edges']
>[number]['node'];
interface ProjectDetailsProps {
  project: Project | null;
  loading: boolean;
}

const ProjectDetails: FC<ProjectDetailsProps> = ({ project, loading, ...props }) => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const totalAmount = project ? numeral(project.project_budget).format(`0,0.00`) : 'N/A';

  const align = mdUp ? 'horizontal' : 'vertical';

  return (
    <Card {...props}>
      {loading && <LinearProgress />}
      <CardHeader title="Détails du projet" />
      <PropertyList>
        <PropertyListItem
          align={align}
          divider
          label="Nom projet"
          value={project ? project.name : 'N/A'}
        />
        <PropertyListItem
          align={align}
          divider
          label="contact person email"
          value={project && project.contact_person_email ? project.contact_person_email : 'N/A'}
        />
        <PropertyListItem
          align={align}
          divider
          label="contact person nom"
          value={project && project.contact_person_name ? project.contact_person_name : 'N/A'}
        />
        <PropertyListItem
          align={align}
          divider
          label="Status du projet"
        >
          <SeverityPill color={project?.status == true ? 'success' : 'error'}>
            {project?.status == true ? 'active' : 'inactif'}
          </SeverityPill>
          {/* {project?.financial_backer.map((backer, index) => (
            <Typography
              key={index}
              color="text.secondary"
              variant="body2"
            >
              - {backer}
            </Typography>
          ))}
          {!project?.financial_backer.length && (
            <Typography
              color="text.secondary"
              variant="body2"
            >
              - N/A
            </Typography>
          )} */}
        </PropertyListItem>
        <PropertyListItem
          align={align}
          divider
          label="date de début"
          value={project && project.start_date ? project.start_date : 'N/A'}
        />
        <PropertyListItem
          align={align}
          divider
          label="date de fin"
          value={project && project.end_date ? project.end_date : 'N/A'}
        />
        <PropertyListItem
          align={align}
          divider
          label="description"
          value={project && project.description ? project.description : 'N/A'}
        />
        {/* <PropertyListItem
          align={align}
          divider
          label="Bénéficiaires"
        >
          {project?.beneficiaries.map((beneficiary, index) => (
            <Typography
              key={index}
              color="text.secondary"
              variant="body2"
            >
              - {beneficiary}
            </Typography>
          ))}
          {!project?.beneficiaries.length && (
            <Typography
              color="text.secondary"
              variant="body2"
            >
              - N/A
            </Typography>
          )}
        </PropertyListItem> */}
        <PropertyListItem
          align={align}
          label="Montant global"
          value={`MAD ${totalAmount}`}
          divider
        />
      </PropertyList>
      {project && <ProjectDeleteManage projectId={String(project.id)} />}
    </Card>
  );
};
export default ProjectDetails;
