import { useState, type FC } from 'react';
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
import type { Invoice } from 'src/types/invoice';
import { calculateTotals } from 'src/utils/calculations/total-items-calculate';

interface InvoicePreviewProps {
  invoice: Invoice;
}

const InvoicePreview: FC<InvoicePreviewProps> = (props) => {
  const { invoice, ...other } = props;

  const items = invoice.items || [];
  const dueDate = invoice.dueDate && format(invoice.dueDate, 'dd MMM yyyy');
  const issueDate = invoice.issueDate && format(invoice.issueDate, 'dd MMM yyyy');
  const [isTvaActive, setIsTvaActive] = useState(true); // Set the initial state based on your logic
  const { totalHt, tva, totalWithVat } = calculateTotals(items, isTvaActive);

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
            {invoice.customer}
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
            <Typography variant="body2">{issueDate}</Typography>
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
            <Typography variant="body2">{invoice.id}</Typography>
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
          {invoice.customer}
          <br />
          {invoice.id}
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
          {items.map((item, index) => {
            const unitAmount = numeral(item.price).format(`0,0.00`);
            const totalAmount = numeral(item.amount).format(`0,0.00`);

            return (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{unitAmount}</TableCell>
                <TableCell align="right">{totalAmount}</TableCell>
              </TableRow>
            );
          })}
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
              <Typography variant="subtitle2">{totalHt}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              colSpan={3}
              sx={{ borderBottom: 'none' }}
            />
            <TableCell sx={{ borderBottom: 'none' }}>
              <Typography variant="subtitle1">Taxes</Typography>
            </TableCell>
            <TableCell
              align="right"
              sx={{ borderBottom: 'none' }}
            >
              <Typography variant="subtitle2">{tva}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              colSpan={3}
              sx={{ borderBottom: 'none' }}
            />
            <TableCell sx={{ borderBottom: 'none' }}>
              <Typography variant="subtitle1">Total</Typography>
            </TableCell>
            <TableCell
              align="right"
              sx={{ borderBottom: 'none' }}
            >
              <Typography variant="subtitle2">{totalWithVat}</Typography>
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
  invoice: PropTypes.object.isRequired,
};

export default InvoicePreview;
