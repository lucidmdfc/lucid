import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { MenuItem, Stack } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { SeverityPill } from 'src/components/severity-pill';
import * as yup from 'yup';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { paths } from 'src/paths';
import { useRouter } from 'next/router';
import CreateConfirmation from './create-modal-confirmation';
import { useDialog } from 'src/hooks/use-dialog';
import { useMutation } from '@apollo/client';
import { CREATE_MEMBER } from 'src/graphql/entities/members/mutations';
import { PAYMENT_METHOD_OPTIONS } from 'src/graphql/shared/enums/paymentMethods';
import LoadingBackdrop from 'src/components/loadingBackdrop';

type PaymentMethod = {
  text: string;
  value: number;
};

const methods: PaymentMethod[] = [
  {
    text: 'Chèque',
    value: 1,
  },
  {
    text: 'Virement',
    value: 2,
  },
  {
    text: 'Carte',
    value: 3,
  },
  {
    text: 'Espèce',
    value: 4,
  },
];

const validationSchema = yup.object({
  full_name: yup.string().required('Nom membre est requis'),
  email: yup.string().required('Email est requis').email('Format email invalide'),
  rc_cin: yup.string().required('CIN/Registre de Commerce est requis'),
  status: yup.string().required('Statut est requis'),
  phone: yup
    .string()
    .required('Le numéro de téléphone est requis')
    .matches(/^[0-9+\-() ]{6,20}$/, 'Numéro de téléphone invalide'),
});

const NewMemberForm = () => {
  const router = useRouter();
  const dialog = useDialog();
  const [createMember, { loading, error }] = useMutation(CREATE_MEMBER);
  const formik = useFormik({
    initialValues: {
      full_name: '',
      email: '',
      rc_cin: '',
      status: '',
      phone: '',
      payment_method: null,
      amount: Number(),
      payment_date: new Date(),
      created_at: new Date(),
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      formik.values.full_name = values.full_name.toLowerCase();
      if (values.status === 'unpaid') {
        formik.values.payment_date = new Date(0);
        formik.values.amount = 0;
        formik.values.payment_method = null;
      }
      try {
        // Handle form submission
        const { data, errors } = await createMember({
          variables: {
            full_name: formik.values.full_name,
            email: formik.values.email,
            phone: formik.values.phone,
            rc_cin: formik.values.rc_cin,
            status: formik.values.status === 'paid' ? true : false,
            amount: String(formik.values.amount),
            payment_method: formik.values.payment_method,
            payment_date: formik.values.payment_date,
          },
        });
        console.log(errors);
        console.log(values);
        toast.success('Membre créé avec succès !');
        router.replace(paths.membres.index);
        resetForm();
      } catch (error) {
        // toast.error('Erreur lors de la création du membre!');
        console.error('Erreur lors de la création du membre!: ', error);
        if (
          error.graphQLErrors &&
          error.graphQLErrors[0]?.message.includes('duplicate key value')
        ) {
          toast.error('Un membre avec cet RC/CIN existe déjà.');
        } else {
          toast.error('Erreur lors de la création du membre!');
        }
      } finally {
        // Set isSubmitting back to false after the submission is complete
        setSubmitting(false);
      }
    },
  });

  return (
    <Box sx={{ p: 3 }}>
      <LoadingBackdrop open={loading} />
      {!loading && (
        <CreateConfirmation
          isOpen={dialog.open}
          onCancel={dialog.handleClose}
          onConfirm={formik.handleSubmit}
        />
      )}
      <form>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Nom membre"
              name="full_name"
              required
              size="small"
              value={formik.values.full_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.full_name && Boolean(formik.errors.full_name)}
              helperText={formik.touched.full_name && formik.errors.full_name}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Email"
              name="email"
              required
              size="small"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              type="string"
              size="small"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Registre de Commerce"
              name="rc_cin"
              required
              size="small"
              value={formik.values.rc_cin}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.rc_cin && Boolean(formik.errors.rc_cin)}
              helperText={formik.touched.rc_cin && formik.errors.rc_cin}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <TextField
              fullWidth
              label="Statut"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.status && Boolean(formik.errors.status)}
              helperText={formik.touched.status && formik.errors.status}
              select
              size="small"
            >
              <MenuItem value={'paid'}>
                <SeverityPill color="success">Payé</SeverityPill>
              </MenuItem>
              <MenuItem value={'unpaid'}>
                <SeverityPill color="error">Impayé</SeverityPill>
              </MenuItem>
            </TextField>
          </Grid>
          {formik.values.status == 'paid' && (
            <Grid
              item
              xs={12}
              md={12}
            >
              <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
                <TextField
                  fullWidth
                  label="Montant"
                  name="amount"
                  type="number"
                  size="small"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.amount && Boolean(formik.errors.amount)}
                  helperText={formik.touched.amount && formik.errors.amount}
                />
                <TextField
                  fullWidth
                  label="Moyen de paiement"
                  name="payment_method"
                  value={formik.values.payment_method}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.payment_method && Boolean(formik.errors.payment_method)}
                  helperText={formik.touched.payment_method && formik.errors.payment_method}
                  select
                  size="small"
                >
                  {PAYMENT_METHOD_OPTIONS.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <Grid
                  item
                  xs={6}
                  md={6}
                >
                  <MobileDatePicker
                    label="Date de paiement"
                    onChange={(newDate) => formik.setFieldValue('payment_date', newDate)}
                    value={formik.values.payment_date}
                  />
                </Grid>
              </Stack>
            </Grid>
          )}
        </Grid>

        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            onClick={dialog.handleOpen}
          >
            {formik.isSubmitting ? 'Création en cours...' : 'Créer un membre'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewMemberForm;
