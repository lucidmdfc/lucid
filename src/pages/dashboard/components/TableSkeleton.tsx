import { FC } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface TableSkeletonProps {
  rowsCount?: number;
  columnsCount?: number;
}

export const TableSkeleton: FC<TableSkeletonProps> = ({ rowsCount = 5, columnsCount = 4 }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Table>
        <TableHead>
          <TableRow>
            {[...Array(columnsCount)].map((_, index) => (
              <TableCell key={index}>
                <Skeleton variant="text" />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(rowsCount)].map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {[...Array(columnsCount)].map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton variant="text" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
