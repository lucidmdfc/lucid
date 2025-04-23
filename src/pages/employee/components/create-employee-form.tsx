import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, MenuItem, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { MobileDatePicker } from '@mui/x-date-pickers';
import toast from 'react-hot-toast';
import { paths } from 'src/paths';
import { useRouter } from 'next/router';
import { employee } from 'src/types/employees_salaries';
import { useDialog } from 'src/hooks/use-dialog';
import CreateConfirmation from './create-modal-confirmation';
import { CREATE_EMPLOYEE } from 'src/graphql/entities/employees/mutations';
import { useMutation } from '@apollo/client';
import * as yup from 'yup';
import { useCreateEmployeeMutation } from 'src/hooks/generatedHook';
import { EmployeeFragmentFragment } from 'src/types/generatedTypes';

const NewEmployee = () => {
  const router = useRouter();
  const dialog = useDialog();
  const [CreateEmployee] = useCreateEmployeeMutation();
  const validationSchema = yup.object({
    salaryName: yup.string().required('Nom membre est requis'),
    salaryFunction: yup.string().required('Fonction est requise'),
    email: yup.string().required('Email est requis').email('Format email invalide'),
    phone: yup.string().required('Téléphone est requis'),
    grossSalary: yup
      .number()
      .typeError('Salaire brut doit être un nombre')
      .required('Salaire brut est requis'),
    recruitmentDate: yup.date().required('Date de recrutement est requise'),
    status: yup.string().required('Statut est requis'),
  });

  const formik = useFormik({
    initialValues: {
      id: 0,
      salaryName: '',
      salaryFunction: '',
      recruitmentDate: new Date(),
      grossSalary: Number(),
      email: '',
      phone: '',
      created_at: new Date(),
      updated_at: new Date(),
      status: 'active',
    },
    validationSchema: validationSchema,
    onSubmit: async (values: EmployeeFragmentFragment, { setSubmitting, resetForm }) => {
      try {
        const {} = await CreateEmployee({
          variables: {
            salaryName: values.salaryName,
            salaryFunction: values.salaryFunction,
            email: values.email ?? '',
            phone: values.phone,
            grossSalary: values.grossSalary.toString(),
            recruitmentDate: values.recruitmentDate,
            status: 'active',
          },
        });
        // Handle form submission
        toast.success('Nouveau salarié(e) créé avec succès !');
        router.replace(paths.employee.index);
        resetForm();
      } catch (error) {
        toast.error('Erreur lors de la création un nouveau salarié(e)!');
        console.error('Erreur lors de la création un nouveau salarié(e)!: ', error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <Box sx={{ p: 3 }}>
      <CreateConfirmation
        isOpen={dialog.open}
        onConfirm={formik.handleSubmit}
        onCancel={dialog.handleClose}
      />
      <form>
        <Grid
          container
          spacing={1}
        >
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Nom de salarié(e)"
              name="salaryName"
              required
              size="small"
              value={formik.values.salaryName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.salaryName && Boolean(formik.errors.salaryName)}
              helperText={formik.touched.salaryName && formik.errors.salaryName}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Fonction"
              name="salaryFunction"
              required
              size="small"
              value={formik.values.salaryFunction}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.salaryFunction && Boolean(formik.errors.salaryFunction)}
              helperText={formik.touched.salaryFunction && formik.errors.salaryFunction}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="email"
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
              label="phone"
              name="phone"
              required
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
            md={4}
          >
            <TextField
              fullWidth
              select
              label="Statut"
              name="status"
              required
              size="small"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.status && Boolean(formik.errors.status)}
              helperText={formik.touched.status && formik.errors.status}
            >
              <MenuItem value="active">Actif</MenuItem>
              <MenuItem value="inactive">Inactif</MenuItem>
            </TextField>
          </Grid>

          <Grid
            item
            xs={12}
            md={12}
            container
            spacing={1}
          >
            <Grid
              item
              xs={12}
              md={8}
            >
              <TextField
                fullWidth
                label="Salaire Brut"
                name="grossSalary"
                type="number"
                required
                size="small"
                value={formik.values.grossSalary}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
            >
              <MobileDatePicker
                label="Date de recrutement"
                onChange={(newDate) => formik.setFieldValue('recruitmentDate', newDate)}
                value={formik.values.recruitmentDate}
              />
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button
            onClick={dialog.handleOpen}
            variant="contained"
          >
            Créer
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewEmployee;
