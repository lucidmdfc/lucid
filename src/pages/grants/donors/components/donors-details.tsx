import type { FC } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';

import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';
import Link from 'next/link';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface CustomerBasicDetailsProps {
  id: string;
  donorName: string;
  email?: string;
  phone?: string;
  note?: string;
  onDelete?: () => void;
}

const DonorstDetails: FC<CustomerBasicDetailsProps> = (props) => {
  const { id, donorName, email, phone, note, onDelete, ...other } = props;

  return (
    <Card
      {...other}
      sx={{ height: '100%' }}
    >
      <CardHeader
        title="Détails du Bailleur"
        action={
          <Box>
            <Link
              href={`/projets/donors/${id}/edit`}
              passHref
            >
              <IconButton
                component="a"
                aria-label="Modifier le bailleur"
              >
                <EditIcon />
              </IconButton>
            </Link>
            {/* {onDelete && (
              <IconButton
                aria-label="Supprimer le bailleur"
                onClick={onDelete}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            )} */}
          </Box>
        }
      />
      <PropertyList>
        <PropertyListItem
          divider
          label="Nom du Bailleur"
          value={donorName || 'Aucun nom disponible'}
        />
        <PropertyListItem
          divider
          label="Email du Bailleur"
          value={email || 'Aucun email disponible'}
        />
        <PropertyListItem
          divider
          label="Téléphone du Bailleur"
          value={phone || 'Aucun téléphone disponible'}
        />
        <PropertyListItem
          divider
          label="Note"
          value={note || 'Aucune note disponible'}
        />
      </PropertyList>
    </Card>
  );
};

DonorstDetails.propTypes = {
  donorName: PropTypes.string.isRequired,
  email: PropTypes.string,
};
export default DonorstDetails;
