import { IconButton, SvgIcon, TableCell, TableRow, Typography } from '@mui/material';
import ArrowRight from '@untitled-ui/icons-react/build/esm/ArrowRight';
import React, { FC } from 'react';
import { employee } from 'src/types/employees_salaries';
interface EmployeeListTableRowProps {
  salary: employee;
  date: string;
  totalAmount: string;
  onSelect?: (EmployeeId: string) => void;
}
const EmployeeListTableRow: FC<EmployeeListTableRowProps> = ({
  salary,
  date,
  totalAmount,
  onSelect,
}) => {
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
            <ArrowRight />
          </SvgIcon>
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default EmployeeListTableRow;
