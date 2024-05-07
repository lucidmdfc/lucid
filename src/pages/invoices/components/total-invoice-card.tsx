import React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ReceiptIcon from '@untitled-ui/icons-react/build/esm/Receipt';

const TotalInvoiceCard = () => {
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
              height: 48,
              width: 48,
            }}
          >
            <ReceiptIcon />
          </Avatar>
          <div>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              Total
            </Typography>
            <Typography variant="h6">$5,300.00</Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              Sur 12 factures
            </Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TotalInvoiceCard;
