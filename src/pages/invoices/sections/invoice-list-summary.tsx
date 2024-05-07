import Grid from '@mui/material/Unstable_Grid2';
import TotalInvoiceCard from '../components/total-invoice-card';
import PaidInvoiceCard from '../components/paid-invoice-card';
import PendingInvoiceCard from '../components/pending-invoice-card';

export const InvoiceListSummary = () => (
  <>
    <Grid
      container
      spacing={3}
    >
      <Grid
        xs={12}
        md={6}
        lg={4}
      >
        <TotalInvoiceCard />
      </Grid>
      <Grid
        xs={12}
        md={6}
        lg={4}
      >
        <PaidInvoiceCard />
      </Grid>
      <Grid
        xs={12}
        md={6}
        lg={4}
      >
        <PendingInvoiceCard />
      </Grid>
    </Grid>
  </>
);
