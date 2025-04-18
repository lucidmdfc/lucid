import React, { FC, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import SvgIcon from '@mui/material/SvgIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Scrollbar } from 'src/components/scrollbar';
import SlicesTotalAmounts from '../components/slice-total-amounts';
import Edit from '@mui/icons-material/Edit';
import Trash02 from '@untitled-ui/icons-react/build/esm/Trash02';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteConfirmationModal from '../components/delete-confirmation-modal';
import { slice } from 'src/types/slice';
import DeleteSliceModal from '../components/delete-slice-confirmation-modal';
import { useRouter } from 'next/router';
import { paths } from 'src/paths';
import { useFormik } from 'formik';
import SliceRow from '../components/slice-list-table-row';
import { Button, Divider, LinearProgress } from '@mui/material';
import { Stack } from '@mui/system';
import { RouterLink } from 'src/components/router-link';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';

interface SlicesListTableProps {
  slices?: slice[] | null;
  total?: number;
  projectId: string;
  onRefresh: () => void;
  onUpdate: () => void;
  loading?: boolean;
}

const SlicesListTable: FC<SlicesListTableProps> = (props) => {
  const { slices = [], total, projectId, onRefresh, onUpdate, loading, ...other } = props;

  return (
    <>
      <Card {...other}>
        {loading && <LinearProgress />}
        <CardHeader
          title="Historique des tranches de paiement"
          action={
            <Button
              component={RouterLink}
              href={paths.projets.tranche}
              startIcon={
                <SvgIcon>
                  <PlusIcon />
                </SvgIcon>
              }
              variant="contained"
            >
              Nouvelle Tranche
            </Button>
          }
        />
        {/* <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          // sx={{ p: 3 }}
        >
          <Button
            component={RouterLink}
            href={paths.projets.tranche}
            startIcon={
              <SvgIcon>
                <PlusIcon />
              </SvgIcon>
            }
            variant="contained"
          >
            Nouvelle Tranche
          </Button>
        </Stack> */}
        <Scrollbar>
          <Table sx={{ minWidth: 600 }}>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Montant</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slices?.map((slice) => {
                return (
                  <SliceRow
                    key={slice.id}
                    slice={slice}
                    projectId={projectId}
                    onRefresh={onRefresh}
                    onUpdate={onUpdate}
                  />
                );
              })}
            </TableBody>
          </Table>
        </Scrollbar>
        <TablePagination
          component="div"
          count={slices?.length ?? 0}
          onPageChange={(): void => {}}
          onRowsPerPageChange={(): void => {}}
          page={0}
          rowsPerPage={5}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      <SlicesTotalAmounts slicesTotal={total || null} />
    </>
  );
};
export default SlicesListTable;
SlicesListTable.propTypes = {
  slices: PropTypes.array,
};
