import { IconButton, Link, Stack, SvgIcon, TableCell, TableRow, Typography } from '@mui/material';
import ArrowRight from '@untitled-ui/icons-react/build/esm/ArrowRight';
import React, { FC } from 'react';
import { RouterLink } from 'src/components/router-link';
import { SeverityPill } from 'src/components/severity-pill';
import { paths } from 'src/paths';
import { GetDonorsQuery } from 'src/types/generatedTypes';
// import { Project } from 'src/types/project';
type Donors = NonNullable<NonNullable<GetDonorsQuery['donorsCollection']>['edges']>[number]['node'];

interface ProjectListTableRowProps {
  donor: Donors;
  onSelect?: (projectId: string) => void;
}

const ProjectListTableRow: FC<ProjectListTableRowProps> = ({ donor, onSelect }) => {
  return (
    <TableRow
      hover
      key={donor.id}
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
              href={paths.projets.details.replace(':projetId', String(donor?.id))}
              variant="subtitle2"
            >
              {donor.name}
            </Link>
          </div>
        </Stack>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{donor.email}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{donor.phone}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{donor.note}</Typography>
      </TableCell>


      <TableCell align="right">
        <IconButton
          color="info"
          onClick={() => onSelect?.(String(donor.id))}
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
