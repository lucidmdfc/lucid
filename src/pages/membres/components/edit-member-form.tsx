import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { MenuItem } from '@mui/material';
import { Member, PaymentMethod } from 'src/types/member';
import UpdateConfirmation from './edit-modal-confimration';
import { useDialog } from 'src/hooks/use-dialog';
import { useMutation } from '@apollo/client';
import { UPDATE_MEMBER } from 'src/graphql/entities/members/mutations';
import { PAYMENT_METHOD_OPTIONS } from 'src/graphql/shared/enums/paymentMethods';
import LoadingBackdrop from 'src/components/loadingBackdrop';
import toast from 'react-hot-toast';

interface MemberEditProps {
  onCancel?: () => void;
  onSave?: (id: string, values: Member) => void;
  member: Member;
}

const MemberEdit: React.FC<MemberEditProps> = ({ onCancel, onSave, member }) => {
  const dialog = useDialog();
  const [updateMember, { data, error, loading }] = useMutation(UPDATE_MEMBER);
  const { values, handleChange, handleSubmit, setFieldValue, touched, errors } = useFormik({
    initialValues: {
      id: member.id,
      full_name: member.full_name,
      email: member.email,
      rc_cin: member.rc_cin,
      payment_method: member.payment_method,
      amount: member.amount,
      payment_date:
        member.status === true ? member.payment_date && member.payment_date : new Date(),
      status: member.status,
      updated_at: new Date(),
    },
    validationSchema: Yup.object({
      full_name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
    }),
    onSubmit: async (formValues) => {
      if (formValues.status == false) {
        formValues.payment_date = new Date(0);
        formValues.amount = 0;
      }
      try {
        const { data } = await updateMember({
          variables: {
            filter: { id: { eq: values.id } },
            set: {
              full_name: String(values.full_name),
              email: String(values.email),
              rc_cin: String(values.rc_cin),
              status: values.status,
              payment_method: String(values.payment_method),
              payment_date: values.payment_date,
              amount: String(values.amount),
              updated_at: new Date().toISOString(),
            },
            atMost: 1,
          },
        });
        toast.success('Membre modifié avec succès !');
      } catch (error) {
        toast.error('Erreur lors de la modification du membre!');
        console.error('Erreur lors de la modification du membre!: ', error);
      }

      if (onSave) {
        onSave(formValues.id, formValues);
      }
    },
  });

  useEffect(() => {
    setFieldValue('id', member.id);
    setFieldValue('full_name', member.full_name);
    setFieldValue('email', member.email);
    setFieldValue('rc_cin', member.rc_cin);
    setFieldValue('payment_method', member.payment_method);
    setFieldValue('amount', member.amount);
    setFieldValue(
      'payment_date',
      // member.status === 'paid' ? member.payment_date && member.payment_date.toDate() : new Date()
      member.status === true ? member.payment_date && member.payment_date : new Date()
    );
    setFieldValue('status', member.status);
  }, [member, setFieldValue]);

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
                label="Nom et prénom"
                name="full_name"
                value={values.full_name}
                onChange={handleChange}
                error={touched.full_name && Boolean(errors.full_name)}
                helperText={touched.full_name && errors.full_name}
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
                label="Registre de Commerce"
                name="rc_cin"
                value={values.rc_cin}
                onChange={handleChange}
                error={touched.rc_cin && Boolean(errors.rc_cin)}
                helperText={touched.rc_cin && errors.rc_cin}
              />
              {/* <TextField
                fullWidth
                label="Status"
                name="status"
                select
                SelectProps={{ native: true }}
                value={values.status}
                onChange={handleChange}
                error={touched.status && Boolean(errors.status)}
                helperText={
                  touched.status && typeof errors.status === 'string' ? errors.status : ''
                }
              >
                {['paid', 'unpaid'].map((statusOption) => (
                  <option
                    key={statusOption}
                    value={statusOption}
                  >
                    {statusOption === 'paid' ? 'Payée' : 'Impayée'}
                  </option>
                ))}
              </TextField> */}
              <TextField
                fullWidth
                label="Status"
                name="status"
                select
                SelectProps={{ native: true }}
                value={values.status}
                onChange={(e) => setFieldValue('status', e.target.value === 'true')} // convert string to boolean
                error={touched.status && Boolean(errors.status)}
                helperText={
                  touched.status && typeof errors.status === 'string' ? errors.status : ''
                }
              >
                <option value="true">Payée</option>
                <option value="false">Impayée</option>
              </TextField>
              {values.status === true && (
                <>
                  <TextField
                    fullWidth
                    label="Moyen de paiement"
                    name="payment_method"
                    select
                    SelectProps={{
                      native: true,
                    }}
                    value={values.payment_method}
                    onChange={handleChange}
                    error={touched.payment_method && Boolean(errors.payment_method)}
                    helperText={touched.payment_method && errors.payment_method}
                  >
                    {/* <option value={''}>--</option> */}
                    {/* {Object.values(PaymentMethod).map((method) => (
                      <option
                        key={method}
                        value={method}
                      >
                        {method}
                      </option>
                    ))} */}
                    {PAYMENT_METHOD_OPTIONS.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    label="Montant"
                    name="amount"
                    value={values.amount}
                    onChange={handleChange}
                    error={touched.amount && Boolean(errors.amount)}
                    helperText={touched.amount && errors.amount}
                  />
                  <MobileDatePicker
                    label="Date de paiement"
                    onChange={(newDate) => setFieldValue('payment_date', newDate)}
                    value={values.payment_date ? new Date(values.payment_date) : null}
                  />
                </>
              )}
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
export default MemberEdit;
MemberEdit.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
};
