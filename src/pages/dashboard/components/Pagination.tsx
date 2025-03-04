import type { ChangeEvent, FC, MouseEvent } from 'react';
import TablePagination from '@mui/material/TablePagination';

interface PaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, page: number) => void;
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Pagination: FC<PaginationProps> = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <TablePagination
      component="div"
      count={count}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      page={page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[5, 10, 25]}
    />
  );
};
export default Pagination;