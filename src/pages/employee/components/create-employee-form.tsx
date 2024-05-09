import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { MobileDatePicker } from '@mui/x-date-pickers';
import toast from 'react-hot-toast';
import { paths } from 'src/paths';
import { useRouter } from 'next/router';
import { employee } from 'src/types/employees_salaries';
import { useDialog } from 'src/hooks/use-dialog';
import CreateConfirmation from './create-modal-confirmation';

const NewEmployee = () => {
  const router = useRouter();
  const dialog = useDialog();
  const formik = useFormik({
    initialValues: {
      id: '',
      salaryName: '',
      salaryFunction: '',
      recruitmentDate: new Date(),
      grossSalary: Number(),
      createdDate: new Date(),
    },
    // validationSchema: validationSchema,
    onSubmit: async (values: employee, { setSubmitting, resetForm }) => {
      try {
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
            />
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
