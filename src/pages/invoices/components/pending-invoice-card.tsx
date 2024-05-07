import React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ClockIcon from '@untitled-ui/icons-react/build/esm/Clock';

const PendingInvoiceCard = () => {
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
              backgroundColor: 'warning.lightest',
              color: 'warning.main',
              height: 48,
              width: 48,
            }}
          >
            <ClockIcon />
          </Avatar>
          <div>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              En cours
            </Typography>
            <Typography variant="h6">$276.87</Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              2 factures
            </Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PendingInvoiceCard;
