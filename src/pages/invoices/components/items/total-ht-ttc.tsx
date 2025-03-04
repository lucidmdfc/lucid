import { useState, FC, useEffect } from 'react';
import numeral from 'numeral';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { FormControlLabel, Stack, Switch } from '@mui/material';
import { calculateTotals } from 'src/utils/calculations/total-items-calculate';
import { Item } from 'src/types/item';

interface ItemsDetailsProps {
  items: Item[];
}

const ItemsDetails: FC<ItemsDetailsProps> = ({ items }) => {
  const [isTvaActive, setIsTvaActive] = useState(true); // Set the initial state based on your logic
  const { totalHt, tva, totalWithVat } = calculateTotals(items, isTvaActive);

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
