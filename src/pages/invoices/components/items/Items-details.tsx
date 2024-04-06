import { useState, type FC, useEffect } from 'react';
import numeral from 'numeral';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { Item, itemsApi } from '../../../../api/items/index';
import { FormControlLabel, Stack, Switch } from '@mui/material';

interface itemsDetailsProps {
  items: Item[];
}
const ItemsDetails: FC<itemsDetailsProps> = ({ items }) => {
  const [isTvaActive, setIsTvaActive] = useState(true); // Set the initial state based on your logic
  const [totalHt, setTotalHt] = useState('0.00');
  const [tva, setTva] = useState('0.00');
  const [totalWithVat, setTotalWithVat] = useState('0.00');

  useEffect(() => {
    const ht = itemsApi.calculateTotalAmount(items);
    const tvaPercentage = isTvaActive ? 0.2 : 0;
    const calculatedTva = ht * tvaPercentage;
    const total = ht + calculatedTva;

    setTotalHt(numeral(ht).format('0,0.00'));
    setTva(numeral(calculatedTva).format('0,0.00'));
    setTotalWithVat(numeral(total).format('0,0.00'));
  }, [items, isTvaActive]);
  return (
    <List>
      <ListItem
        disableGutters
        divider
        sx={{
          justifyContent: 'space-between',
          padding: 2,
        }}
      >
        <Typography variant="subtitle2">Total HT</Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          MAD {totalHt}
        </Typography>
      </ListItem>
      <ListItem
        disableGutters
        divider
        sx={{
          justifyContent: 'space-between',
          padding: 1,
        }}
      >
        <Stack spacing={3}>
          <FormControlLabel
            control={
              <Switch
                checked={isTvaActive}
                onChange={() => setIsTvaActive(!isTvaActive)}
                name="allDay"
              />
            }
            label={isTvaActive ? 'TVA 20%' : 'EXO'}
          />
        </Stack>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          MAD {tva}
        </Typography>
      </ListItem>
      <ListItem
        disableGutters
        sx={{
          justifyContent: 'space-between',
          padding: 2,
        }}
      >
        <Typography variant="subtitle2">Total TTC</Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          MAD {totalWithVat}
        </Typography>
      </ListItem>
    </List>
  );
};
export default ItemsDetails;
