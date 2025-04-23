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
import { useMutation } from '@apollo/client';
import { UPDATE_EMPLOYEE } from 'src/graphql/entities/employees/mutations';
import { status } from 'nprogress';
import { stat } from 'fs';
import * as yup from 'yup';
import { useUpdateEmployeeMutation } from 'src/hooks/generatedHook';
import { EmployeeFragmentFragment } from 'src/types/generatedTypes';

interface EmployeeEditProps {
  onCancel?: () => void;
  onSave?: () => void;
  salary: EmployeeFragmentFragment;
}

const EmployeeEdit: FC<EmployeeEditProps> = (props) => {
  const { onCancel, onSave, salary } = props;
  const dialog = useDialog();
  const [updateEmployee, { data, loading, error }] = useUpdateEmployeeMutation();
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
      email: '',
      phone: '',
      recruitmentDate: new Date(),
      grossSalary: Number(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'active',
    },
    validationSchema: validationSchema,
    onSubmit: async (values: EmployeeFragmentFragment, { setSubmitting, resetForm }) => {
      // console.log(values, salary);
      // console.log('values', values);

      try {
        // Handle form submission
        await updateEmployee({
          variables: {
            id: Number(salary.id),
            salaryName: values.salaryName,
            salaryFunction: values.salaryFunction,
            email: values.email ?? '',
            phone: values.phone,
            grossSalary: values.grossSalary.toString(),
            recruitmentDate: new Date(values.recruitmentDate),
            status: values.status,
          },
        });
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
      id: Number(salary.id),
      salaryName: salary.salaryName,
      salaryFunction: salary.salaryFunction,
      email: salary.email,
      phone: salary.phone,
      grossSalary: salary.grossSalary,
      recruitmentDate: new Date(salary.recruitmentDate),
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
                onBlur={formik.handleBlur}
                error={formik.touched.salaryName && Boolean(formik.errors.salaryName)}
                helperText={formik.touched.salaryName && formik.errors.salaryName}
              />
              <TextField
                fullWidth
                label="Fonction"
                name="salaryFunction"
                value={formik.values.salaryFunction}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.salaryFunction && Boolean(formik.errors.salaryFunction)}
                helperText={formik.touched.salaryFunction && formik.errors.salaryFunction}
              />

              <TextField
                fullWidth
                label="Salaire Brut"
                name="grossSalary"
                type="number"
                value={formik.values.grossSalary}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.grossSalary && Boolean(formik.errors.grossSalary)}
                helperText={
                  formik.touched.grossSalary && typeof formik.errors.grossSalary === 'string'
                    ? formik.errors.grossSalary
                    : undefined
                }
              />
              <TextField
                fullWidth
                label="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                label="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
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
