import React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ReceiptCheckIcon from '@untitled-ui/icons-react/build/esm/ReceiptCheck';

const PaidSupplierCard = () => {
  return (
    <Card>
      <CardContent>
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
        >
          <Avatar
            sx={{
              backgroundColor: 'success.lightest',
              color: 'success.main',
              height: 48,
              width: 48,
            }}
          >
            <ReceiptCheckIcon />
          </Avatar>
          <div>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              Payé
            </Typography>
            <Typography variant="h6">$1,439.60</Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              3 factures
            </Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PaidSupplierCard;
