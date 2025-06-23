import { IconButton, SvgIcon, TableCell, TableRow, Typography } from '@mui/material';
import { ArrowRightIcon } from '@mui/x-date-pickers';
import React, { FC } from 'react';
import { SeverityPill } from 'src/components/severity-pill';
import { Member } from 'src/types/member';
interface MemberListTableRowProps {
  member: Member;
  onSelect?: (memberId: string) => void;
}
const MemberListTableRow: FC<MemberListTableRowProps> = ({ member, onSelect }) => {
  return (
    <TableRow hover>
      <TableCell>
        <Typography variant="subtitle2">{member.full_name}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{member.email}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{member.rc_cin}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{member.payment_method ?? '--'}</Typography>
      </TableCell>
      <TableCell>
        <SeverityPill color={member?.status == true ? 'success' : 'error'}>
          {member?.status == false ? 'payée' : 'impayée'}
        </SeverityPill>
      </TableCell>
      <TableCell>
        <IconButton
          color="info"
          onClick={() => onSelect?.(member.id)}
        >
          <SvgIcon>
            <ArrowRightIcon />
          </SvgIcon>
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default MemberListTableRow;
