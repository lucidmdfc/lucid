import { IconButton, Link, Stack, SvgIcon, TableCell, TableRow, Typography } from '@mui/material';
import ArrowRight from '@untitled-ui/icons-react/build/esm/ArrowRight';
import React, { FC } from 'react';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import { Project } from 'src/types/project';

interface ProjectListTableRowProps {
  project: Project;
  totalAmount: string;
}

const ProjectListTableRow: FC<ProjectListTableRowProps> = ({ project, totalAmount }) => {
  console.log(project);

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
              href={paths.projets.details.replace(':projetId', project?.id)}
              variant="subtitle2"
            >
              {project.project_name}
            </Link>
          </div>
        </Stack>
      </TableCell>
      <TableCell> {project.email}</TableCell>
      <TableCell>
        {project?.financial_backer?.slice(-2).map((financial, i) => {
          return (
            <Typography
              key={i}
              color="text.secondary"
              variant="body2"
            >
              - {financial}
            </Typography>
          );
        })}
        {project?.financial_backer.length <= 0 && (
          <Typography
            color="text.secondary"
            variant="body2"
          >
            --
          </Typography>
        )}
      </TableCell>
      <TableCell>
        {project?.beneficiaries?.slice(-2).map((beneficary, i) => {
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
        )}
      </TableCell>
      <TableCell>
        <Typography variant="body2">MAD {totalAmount}</Typography>
      </TableCell>
      <TableCell align="right">
        <Link
          component={RouterLink}
          href={paths.projets.details.replace(':projetId', project?.id)}
        >
          <IconButton color="info">
            <SvgIcon>
              <ArrowRight />
            </SvgIcon>
          </IconButton>
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default ProjectListTableRow;
