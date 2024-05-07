import { useEffect, useState, type FC } from 'react';
import ClockIcon from '@untitled-ui/icons-react/build/esm/Clock';
import ReceiptCheckIcon from '@untitled-ui/icons-react/build/esm/ReceiptCheck';
import ReceiptIcon from '@untitled-ui/icons-react/build/esm/Receipt';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Supplier } from 'src/types/supplier';
import TotalSupplierCard from '../components/total-supplier-card';
import PaidSupplierCard from '../components/paid-supplier-card';
import PendingSupplierCard from '../components/pending-supplier-card';

interface SupplierAmountSummaryProps {
  count?: number;
  items?: Supplier[];
}
const SupplierAmountSummary: FC<SupplierAmountSummaryProps> = (props) => {
  return (
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
          <TotalSupplierCard />
        </Grid>
        <Grid
          xs={12}
          md={6}
          lg={4}
        >
          <PaidSupplierCard />
        </Grid>
        <Grid
          xs={12}
          md={6}
          lg={4}
        >
          <PendingSupplierCard />
        </Grid>
      </Grid>
    </>
  );
};

export default SupplierAmountSummary;
