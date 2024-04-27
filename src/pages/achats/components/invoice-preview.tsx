import type { FC } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import numeral from 'numeral';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { Logo } from 'src/components/logo';
import { provider } from 'src/types/provider';

interface ProviderPreviewProps {
  provider: provider;
}

export const InvoicePreview: FC<ProviderPreviewProps> = (props) => {
  const { provider, ...other } = props;

  const dueDate = provider.dueDate && format(provider.dueDate, 'dd MMM yyyy');
  const depositedDate = provider.depositedDate && format(provider.depositedDate, 'dd MMM yyyy');

  return (
    <Card
      {...other}
      sx={{ p: 6 }}
    >
      <Stack
        alignItems="flex-start"
        direction="row"
        justifyContent="space-between"
        spacing={3}
      >
        <div>
          <Box
            sx={{
              display: 'inline-flex',
              height: 24,
              width: 24,
            }}
          >
            <Logo />
          </Box>
          <Typography variant="subtitle2">www.devias.io</Typography>
        </div>
        <div>
          <Typography
            align="right"
            variant="subtitle2"
          >
            {provider.ice}
          </Typography>
        </div>
      </Stack>
      <Box sx={{ mt: 4 }}>
        <Grid
          container
          justifyContent="space-between"
        >
          <Grid
            xs={12}
            md={4}
          >
            <Typography variant="body2">
              Street King William, 123
              <br />
              Level 2, C, 442456
              <br />
              San Francisco, CA, USA
            </Typography>
          </Grid>
          <Grid
            xs={12}
            md={4}
          >
            <Typography variant="body2">
              Company No. 4675933
              <br />
              EU VAT No. 949 67545 45
              <br />
            </Typography>
          </Grid>
          <Grid
            xs={12}
            md={4}
          >
            <Typography
              align="right"
              variant="body2"
            >
              accounts@devias.io
              <br />
              (+40) 652 3456 23
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Grid
          container
          justifyContent="space-between"
        >
          <Grid
            xs={12}
            md={4}
          >
            <Typography
              gutterBottom
              variant="subtitle2"
            >
              Due date
            </Typography>
            <Typography variant="body2">{dueDate}</Typography>
          </Grid>
          <Grid
            xs={12}
            md={4}
          >
            <Typography
              gutterBottom
              variant="subtitle2"
            >
              Date of issue
            </Typography>
            <Typography variant="body2">{depositedDate}</Typography>
          </Grid>
          <Grid
            xs={12}
            md={4}
          >
            <Typography
              gutterBottom
              variant="subtitle2"
            >
              Number
            </Typography>
            <Typography variant="body2">{provider.id}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography
          gutterBottom
          variant="subtitle2"
        >
          Billed to
        </Typography>
        <Typography variant="body2">
          {provider.nom}
          <br />
          {provider.ice}
          <br />
        </Typography>
      </Box>
      <Table sx={{ mt: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={3}
              sx={{ borderBottom: 'none' }}
            />
            <TableCell sx={{ borderBottom: 'none' }}>
              <Typography variant="subtitle1">Subtotal</Typography>
            </TableCell>
            <TableCell
              align="right"
              sx={{ borderBottom: 'none' }}
            >
              <Typography variant="subtitle2">{provider.amount}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box sx={{ mt: 2 }}>
        <Typography
          gutterBottom
          variant="h6"
        >
          Notes
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          Please make sure you have the right bank registration number as I had issues before and
          make sure you guys cover transfer expenses.
        </Typography>
      </Box>
    </Card>
  );
};

InvoicePreview.propTypes = {
  // @ts-ignore
  provider: PropTypes.object.isRequired,
};
