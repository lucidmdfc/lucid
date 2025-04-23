import { useCallback, useState, type ChangeEvent, type FC, type MouseEvent } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { IconButton, SvgIcon, TableHead } from '@mui/material';
import { format } from 'date-fns';
import { employee } from 'src/types/employees_salaries';
import { useDialog } from 'src/hooks/use-dialog';
import EmployeeListTableRow from '../components/employee-list-table-row';
import { EmployeeFragmentFragment } from 'src/types/generatedTypes';

interface SalaryListTableProps {
  count?: number;
  salaries?: EmployeeFragmentFragment[];
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (employeeId: string) => void;
  page?: number;
  rowsPerPage?: number;
}

const SalaryListTable: FC<SalaryListTableProps> = (props) => {
  const {
    count = 0,
    salaries = [],
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
            <TableCell>Nom du salarié</TableCell>
            <TableCell>Fonction</TableCell>
            <TableCell>Date de recrutement</TableCell>
            <TableCell>Salaire Brut</TableCell>
            <TableCell>Détails</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salaries.map((salary) => {
            const totalAmount = numeral(salary.grossSalary).format(`0,0.00`);
            const date =
              salary?.recruitmentDate && !isNaN(new Date(salary.recruitmentDate).getTime())
                ? format(new Date(salary.recruitmentDate), 'dd/MM/yyyy')
                : 'date indéfinie';
            return (
              <EmployeeListTableRow
                salary={salary}
                onSelect={onSelect}
                date={date}
                totalAmount={totalAmount}
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
export default SalaryListTable;
SalaryListTable.propTypes = {
  count: PropTypes.number,
  salaries: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelect: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
