import { IconButton, Link, Stack, SvgIcon, TableCell, TableRow, Typography } from '@mui/material';
import ArrowRight from '@untitled-ui/icons-react/build/esm/ArrowRight';
import React, { FC } from 'react';
import { RouterLink } from 'src/components/router-link';
import { SeverityPill } from 'src/components/severity-pill';
import { paths } from 'src/paths';
import { GetProjectsQuery } from 'src/types/generatedTypes';
// import { Project } from 'src/types/project';
type Project = NonNullable<
  NonNullable<GetProjectsQuery['projectsCollection']>['edges']
>[number]['node'];

interface ProjectListTableRowProps {
  project: Project;
  totalAmount: string;
  onSelect?: (projectId: string) => void;
}

const ProjectListTableRow: FC<ProjectListTableRowProps> = ({ project, totalAmount, onSelect }) => {
  return (
    <TableRow
      hover
      key={project.id}
    >
      <TableCell>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <div>
            <Link
              color="inherit"
              component={RouterLink}
              href={paths.projets.details.replace(':projetId', String(project?.id))}
              variant="subtitle2"
            >
              {project.name}
            </Link>
          </div>
        </Stack>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{project.contact_person_email}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{project.contact_person_name}</Typography>
        {/* Uncomment if you want to display financial backers */}
        {/* {project?.financial_backer?.slice(-2).map((financial, i) => {
          return (
            <Typography
              key={i}
              color="text.secondary"
              variant="body2"
            >
              - {financial}
            </Typography>
          );
        })} */}
        {/* {project?.financial_backer?.slice(-2).map((financial, i) => {
          return (
            <Typography
              key={i}
              color="text.secondary"
              variant="body2"
            >
              - {financial}
            </Typography>
          );
        })} */}
        {/* {project?.financial_backer.length <= 0 && (
          <Typography
            color="text.secondary"
            variant="body2"
          >
            --
          </Typography>
        )} */}
      </TableCell>
      <TableCell>
        <SeverityPill color={project?.status == true ? 'success' : 'error'}>
          {project?.status == true ? 'active' : 'inactif'}
        </SeverityPill>
        {/* {project?.beneficiaries?.slice(-2).map((beneficary, i) => {
          return (
            <Typography
              key={i}
              color="text.secondary"
              variant="body2"
            >
              - {beneficary}
            </Typography>
          );
        })}
        {project?.beneficiaries.length <= 0 && (
          <Typography
            color="text.secondary"
            variant="body2"
          >
            --
          </Typography>
        )} */}
      </TableCell>
      <TableCell>
        <Typography variant="body2">MAD {totalAmount}</Typography>
      </TableCell>
      <TableCell align="right">
        {/* <Link
          component={RouterLink}
          href={paths.projets.details.replace(':projetId', String(project?.id))}
        > */}
        <IconButton
          color="info"
          onClick={() => onSelect?.(String(project.id))}
        >
          <SvgIcon>
            <ArrowRight />
          </SvgIcon>
        </IconButton>
        {/* </Link> */}
      </TableCell>
    </TableRow>
  );
};

export default ProjectListTableRow;
