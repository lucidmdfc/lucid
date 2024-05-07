import { useEffect, type FC } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers';
import { employee } from 'src/types/employees_salaries';
import UpdateConfirmation from './edit-modal-confirmation';
import { useDialog } from 'src/hooks/use-dialog';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';

interface EmployeeEditProps {
  onCancel?: () => void;
  onSave?: () => void;
  salary: employee;
}

const EmployeeEdit: FC<EmployeeEditProps> = (props) => {
  const { onCancel, onSave, salary } = props;
  const dialog = useDialog();
  const formik = useFormik({
    initialValues: {
      id: '',
      salaryName: '',
      salaryFunction: '',
      recruitmentDate: new Date(),
      grossSalary: Number(),
      updatedDate: new Date(),
      createdDate: new Date(),
    },
    // validationSchema: validationSchema,
    onSubmit: async (values: employee, { setSubmitting, resetForm }) => {
      console.log(values, salary);

      try {
        // Handle form submission
        toast.success('Nouveau salarié(e) créé avec succès !');
        dialog.handleClose();
      } catch (error) {
        toast.error('Erreur lors de la création un nouveau salarié(e)!');
        console.error('Erreur lors de la création un nouveau salarié(e)!: ', error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  useEffect(() => {
    formik.initialValues;
    formik.setValues({
      ...formik.values,
      id: salary.id,
      salaryName: salary.salaryName,
      salaryFunction: salary.salaryFunction,
      grossSalary: salary.grossSalary,
      recruitmentDate: new Date(salary.recruitmentDate),
      createdDate: new Date(salary.createdDate),
    });
  }, [salary]);
  return (
    <>
      <UpdateConfirmation
        isOpen={dialog.open}
        onConfirm={formik.handleSubmit}
        onCancel={dialog.handleClose}
      />
      <form>
        <Stack spacing={6}>
          <Stack spacing={3}>
            <Typography variant="h6">Modifier</Typography>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Nom du salarié"
                name="salaryName"
                value={formik.values.salaryName}
                onChange={formik.handleChange}
              />
              <TextField
                fullWidth
                label="Fonction"
                name="salaryFunction"
                value={formik.values.salaryFunction}
                onChange={formik.handleChange}
              />

              <TextField
                fullWidth
                label="Salaire Brut"
                name="grossSalary"
                type="number"
                value={formik.values.grossSalary}
                onChange={formik.handleChange}
              />
              <DatePicker
                label="Date de recrutement"
                value={formik.values.recruitmentDate} // Cast to DateValue
                onChange={(newValue) => formik.setFieldValue('recruitmentDate', newValue)}
                format="dd/MM/yyyy"
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
                onClick={dialog.handleOpen}
                size="small"
                variant="contained"
              >
                Sauvegarder
              </Button>
              <Button
                color="inherit"
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
export default EmployeeEdit;
EmployeeEdit.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  // @ts-ignore
  salary: PropTypes.object,
};
