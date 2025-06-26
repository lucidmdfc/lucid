import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { MenuItem, Switch } from '@mui/material';
// import { Member, PaymentMethod } from 'src/types/member';
import UpdateConfirmation from './edit-confirmation-modal';
import { useDialog } from 'src/hooks/use-dialog';
import LoadingBackdrop from 'src/components/loadingBackdrop';
import toast from 'react-hot-toast';
import { GetDonorsQuery } from 'src/types/generatedTypes';
import { useUpdateDonorMutation } from 'src/hooks/generatedHook';
import { id } from 'date-fns/locale';

type Donors = NonNullable<NonNullable<GetDonorsQuery['donorsCollection']>['edges']>[number]['node'];
interface DonorsEditProps {
  onCancel?: () => void;
  onSave?: (id: string, values: Donors) => void;
  donor: Donors;
}

const DonorEdit: React.FC<DonorsEditProps> = ({ onCancel, onSave, donor }) => {
  const dialog = useDialog();
  const [updateDonor, { loading, error }] = useUpdateDonorMutation();

  const { values, handleChange, handleSubmit, setFieldValue, touched, errors } = useFormik({
    initialValues: {
      id: donor.id,
      name: donor.name,
      email: donor.email,
      phone: donor.phone,
      note: donor.note,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Le nom du bailleur est requis'),
      email: Yup.string().email('Email invalide').required("L'email est requis"),
      phone: Yup.string().required('Le téléphone est requis'),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        console.log(values);
        const { data } = await updateDonor({
          variables: {
            set: {
              name: values.name,
              email: values.email,
              phone: values.phone,
              note: values.note,
            },
            filter: { id: { eq: values.id } },
            atMost: 1,
          },
        });

        dialog.handleClose();
        toast.success('Project updated');
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
      }
    },
  });
  useEffect(() => {
    setFieldValue('id', donor.id);
    setFieldValue('name', donor.name);
    setFieldValue('email', donor.email);
    setFieldValue('phone', donor.phone);
    setFieldValue('note', donor.note);
  }, [donor, setFieldValue]);
  return (
    <>
      <LoadingBackdrop open={loading} />
      {!loading && (
        <UpdateConfirmation
          isOpen={dialog.open}
          onCancel={dialog.handleClose}
          onConfirm={handleSubmit}
        />
      )}
      <form>
        <Stack spacing={6}>
          <Stack spacing={3}>
            <Typography variant="h6">Détails</Typography>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Project Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                fullWidth
                label="Téléphone"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
              />
              <TextField
                fullWidth
                label="Note"
                name="note"
                value={values.note}
                onChange={handleChange}
                error={touched.note && Boolean(errors.note)}
                helperText={touched.note && errors.note}
              />

            </Stack>
            <Stack
              alignItems="center"
              direction="row"
              flexWrap="wrap"
              spacing={2}
            >
              <Button
                color="primary"
                size="small"
                variant="contained"
                onClick={dialog.handleOpen}
              >
                Sauvegarder
              </Button>
              <Button
                color="error"
                onClick={onCancel}
                size="small"
              >
                Annuler
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </form>
    </>
  );
};
export default DonorEdit;
DonorEdit.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
};
