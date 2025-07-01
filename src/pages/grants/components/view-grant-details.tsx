import { useState, type FC } from 'react';
import PropTypes from 'prop-types';
import { format, fromUnixTime } from 'date-fns';
import numeral from 'numeral';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';

import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';
import type { SeverityPillColor } from 'src/components/severity-pill';
import { SeverityPill } from 'src/components/severity-pill';
import { Scrollbar } from 'src/components/scrollbar';
import type { Order, OrderStatus } from 'src/types/template-types/order';
import { Customer } from 'src/types/template-types/customer';
import { date } from 'yup';
import Trash02 from '@untitled-ui/icons-react/build/esm/Trash02';
import { Divider } from '@mui/material';
import toast from 'react-hot-toast';
import DeleteConfirmationModal from './delete-confirmation-modal';
import { useDialog } from 'src/hooks/use-dialog';
import { GetOneGrantProjectAgreementQuery } from 'src/types/generatedTypes';
type Grant = NonNullable<
  NonNullable<GetOneGrantProjectAgreementQuery['grant_project_agreementCollection']>['edges']
>[number]['node'];
interface projectDetailsProps {
  onApprove?: () => void;
  onEdit?: () => void;
  onReject?: () => void;
  grant: Grant;
}

const grantDetails: FC<projectDetailsProps> = (props) => {
  const { onApprove, onEdit, onReject, grant } = props;
  const dialog = useDialog();

  const handleDelete = async () => {
    try {
      toast.success('Le membre a été supprimé avec succès!');
      dialog.handleOpen();
      if (onApprove !== undefined) {
        onApprove();
      }
    } catch (error) {
      console.error('Error deleting member: ', error);
      toast.error('Échec de la suppression du membre. Veuillez réessayer.');
    }
  };
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const align = lgUp ? 'horizontal' : 'vertical';

  return (
    <Stack spacing={6}>
      <DeleteConfirmationModal
        isOpen={dialog.open}
        onConfirm={handleDelete}
        onCancel={dialog.handleClose}
        message="Êtes vous sûr de vouloir supprimer ce membre  ? Cette action sera irréversible."
        id={grant.id?.toString()}
      />
      <Stack
        alignItems={'start'}
        spacing={3}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={3}
          width={'100%'}
        >
          <Typography variant="h6">Détails du projet</Typography>

          <Button
            color="warning"
            variant="outlined"
            onClick={onEdit}
            size="small"
            startIcon={
              <SvgIcon>
                <Edit02Icon />
              </SvgIcon>
            }
          >
            Modifier
          </Button>
        </Stack>
        <Stack width={'100%'}>
          <PropertyList>
            <PropertyListItem
              align={align}
              disableGutters
              divider
              label="Nom Projet"
              value={grant.projects?.name ?? 'N/A'}
            />
            <PropertyListItem
              align={align}
              disableGutters
              divider
              label="Nom Donor"
              value={grant.donors?.name ?? 'N/A'}
            />
            <PropertyListItem
              align={align}
              disableGutters
              divider
              label="Grant Montant"
              value={grant.grant ?? undefined}
            />
            <PropertyListItem
              align={align}
              disableGutters
              divider
              label="date de l'accord"
              value={grant.agreement_date ?? undefined}
            />
          </PropertyList>
        </Stack>
        <Button
          color="error"
          variant="text"
          onClick={dialog.handleOpen}
          size="small"
          startIcon={
            <SvgIcon>
              <Trash02 />
            </SvgIcon>
          }
        >
          Supprimer
        </Button>
      </Stack>
    </Stack>
  );
};
export default grantDetails;
grantDetails.propTypes = {
  onApprove: PropTypes.func,
  onEdit: PropTypes.func,
  onReject: PropTypes.func,
  // @ts-ignore
  order: PropTypes.object,
};
