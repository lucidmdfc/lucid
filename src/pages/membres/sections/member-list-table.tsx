import { useCallback, useState, type ChangeEvent, type FC, type MouseEvent } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Member } from 'src/types/member';
import MemberListTableRow from '../components/member-list-table-row';
import { TableHead } from '@mui/material';

interface MemberListTableProps {
  count?: number;
  members?: Member[];
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (memberId: string) => void;
  onDelete?: (memberId: string) => void;
  page?: number;
  rowsPerPage?: number;
  onDeleteMember?: () => void;
}

const MemberListTable: FC<MemberListTableProps> = (props) => {
  const {
    count = 0,
    members = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelect,
    page = 0,
    rowsPerPage = 0,
  } = props;

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom/Raison Sociale</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>registre de commerce</TableCell>
            <TableCell>Moyen de paiement</TableCell>
            <TableCell>Statut</TableCell>
            <TableCell>Détails</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((member, i) => {
            return (
              <MemberListTableRow
                key={i}
                member={member}
                onSelect={onSelect}
              />
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Lignes par page"
      />
    </div>
  );
};
export default MemberListTable;
MemberListTable.propTypes = {
  count: PropTypes.number,
  members: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelect: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onDeleteMember: PropTypes.func,
};
