import { IconButton, Link, Stack, SvgIcon, TableCell, TableRow, Typography } from '@mui/material';
import ArrowRight from '@untitled-ui/icons-react/build/esm/ArrowRight';
import React, { FC } from 'react';
import { RouterLink } from 'src/components/router-link';
import { SeverityPill } from 'src/components/severity-pill';
import { paths } from 'src/paths';
import { GetGrantProjectAgreementQuery } from 'src/types/generatedTypes';
// import { Project } from 'src/types/project';
type Grant = NonNullable<
  NonNullable<GetGrantProjectAgreementQuery['grant_project_agreementCollection']>['edges']
>[number]['node'];

interface GrantListTableRowProps {
  grant: Grant;
  onSelect?: (projectId: string) => void;
}

const GrantListTableRow: FC<GrantListTableRowProps> = ({ grant, onSelect }) => {
  return (
    <TableRow
      hover
      key={grant.id}
    >
      <TableCell>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          {/* <div>
            <Link
              color="inherit"
              component={RouterLink}
              href={paths.projets.details.replace(':projetId', String(grant.projects?.id))}
              variant="subtitle2"
            >
              {grant.projects?.name}
            </Link>
          </div> */}
          <Typography variant="body2">
            {`${grant.projects?.name ?? ''} - ${grant.donors?.name ?? ''}`}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{grant.agreement_date}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{grant.grant}</Typography>
      </TableCell>

      <TableCell align="right">
        <IconButton
          color="info"
          onClick={() => onSelect?.(String(grant.id))}
        >
          <SvgIcon>
            <ArrowRight />
          </SvgIcon>
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default GrantListTableRow;
