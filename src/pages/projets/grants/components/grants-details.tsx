import type { FC } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';

import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';

interface CustomerBasicDetailsProps {
  totalAmount: string;
  agreementDate?: string;
}

const GrantDetails: FC<CustomerBasicDetailsProps> = (props) => {
  const { totalAmount, agreementDate, ...other } = props;

  return (
    <Card
      {...other}
      sx={{ height: '100%' }}
    >
      <CardHeader title="Grant details" />
      <PropertyList>
        <PropertyListItem
          divider
          label="Total amount"
          value={totalAmount}
        />
        <PropertyListItem
          divider
          label="Agreement Date"
          value={agreementDate}
        />
      </PropertyList>
    </Card>
  );
};

GrantDetails.propTypes = {
  totalAmount: PropTypes.string.isRequired,
  agreementDate: PropTypes.string,
};
export default GrantDetails;
