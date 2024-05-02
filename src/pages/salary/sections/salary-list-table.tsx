import { useState, type ChangeEvent, type FC, type MouseEvent } from 'react';
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
import { salary } from 'src/types/employees_salaries';

interface SalaryListTableProps {
  count?: number;
  salaries?: salary[];
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (orderId: string) => void;
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
            const date = salary.recruitmentDate && format(salary.recruitmentDate, 'dd/MM/yyyy');

            return (
              <TableRow
                hover
                key={salary.id}
              >
                <TableCell>
                  <Typography variant="subtitle2">{salary.salaryName}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{salary.salaryFunction}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{date}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">MAD {totalAmount}</Typography>
                </TableCell>

                <TableCell>
                  <IconButton
                    color="info"
                    onClick={() => onSelect?.(salary.id)}
                  >
                    <SvgIcon>
                      <ArrowRightIcon />
                    </SvgIcon>
                  </IconButton>
                </TableCell>
              </TableRow>
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
