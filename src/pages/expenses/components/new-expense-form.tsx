import React, { ChangeEvent, FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControlLabel, Grid, MenuItem, Switch } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { paths } from 'src/paths';
import * as Yup from 'yup';
import { expense } from 'src/types/expense';
import { useGetEmployeesQuery, useGetProjectsQuery } from 'src/hooks/generatedHook';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_EXPENSE_CLAIM } from 'src/graphql/entities/expenseClaims/mutations';
import { ExpenseClaimFragmentFragment } from 'src/types/generatedTypes';

const validationSchema = Yup.object().shape({
  project_id: Yup.string().required('Nom projet est requis'),
  employee_id: Yup.string().required('Salarié est requis'),
  amount: Yup.number().required('Montant est requis').positive('Le montant doit être positif'),
});
interface Option {
  text: string;
  value: number;
}

const projects: Option[] = [
  { text: 'project id 1', value: 1 },
  { text: 'project id 2', value: 2 },
  { text: 'project id 3', value: 3 },
  { text: 'project id 4', value: 4 },
  { text: 'project id 5', value: 5 },
];

const salaries: Option[] = [
  { text: 'salary 1', value: 1 },
  { text: 'salary 2', value: 2 },
  { text: 'salary 3', value: 3 },
  { text: 'salary 4', value: 4 },
  { text: 'salary 5', value: 5 },
];

const NewExpenseForm: FC = () => {
  const router = useRouter();
  const [isSwitchOn, setSwitchOn] = useState(false);

  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSwitchOn(event.target.checked);
  };
  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
    refetch: projectRefetch,
  } = useGetProjectsQuery();
  const {
    loading: employeesLoading,
    error: employeesError,
    data: employeesData,
    refetch: employeesRefetch,
  } = useGetEmployeesQuery();

  // console.log('statusData', statusData);
  // console.log(employeesData);
  const [CreateExpenseClaim] = useMutation(CREATE_EXPENSE_CLAIM);

  const formik = useFormik<ExpenseClaimFragmentFragment>({
    initialValues: {
      id: 0,
      project_id: 0,
      employee_id: 0,
      amount: Number(),
      startDate: new Date(),
      endDate: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
      status_id: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Handle form submission
        console.log('Form Submitted with values:', values); // Log form values

        const { project_id, employee_id, amount, startDate, endDate } = values;
        console.log(values);
        const response = await CreateExpenseClaim({
          variables: {
            employee_id: Number(employee_id),
            project_id: Number(project_id),
            amount: amount.toString(),
            startDate: startDate.toISOString(),
            endDate: isSwitchOn ? endDate?.toISOString() : null,
          },
        });
        console.log('response', response);
        toast.success('Nouveaux frais créés avec succès !');
        router.replace(paths.dashboard.expenses.index);
        resetForm();
      } catch (error) {
        toast.error('Erreur lors de la création des nouveaux frais!');
        console.error('Erreur lors de la création des nouveaux frais!: ', error);
      } finally {
        // Set isSubmitting back to false after the submission is complete
        setSubmitting(false);
      }
    },
  });

  return (
    <Box sx={{ p: 3 }}>
      <form onSubmit={formik.handleSubmit}>
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
              label="Nom projet"
              name="project_id"
              value={formik.values.project_id}
              onChange={formik.handleChange}
              select
              size="small"
              error={formik.touched.project_id && Boolean(formik.errors.project_id)}
              helperText={formik.touched.project_id && formik.errors.project_id}
            >
              <MenuItem value={0}>--Sélectionner un projet--</MenuItem>
              {projectsData?.projectsCollection?.edges.map((p: any) => (
                <MenuItem
                  key={p.node.id}
                  value={p.node.id}
                >
                  {p.node.name}
                </MenuItem>
              ))}
              {/* <MenuItem value={0}>autre</MenuItem> */}
            </TextField>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Salarié"
              name="employee_id"
              value={formik.values.employee_id}
              onChange={formik.handleChange}
              select
              size="small"
              error={formik.touched.employee_id && Boolean(formik.errors.employee_id)}
              helperText={formik.touched.employee_id && formik.errors.employee_id}
            >
              <MenuItem value={0}>--Sélectionnez un employé--</MenuItem>
              {employeesData?.employeesCollection?.edges.map((p: any) => (
                <MenuItem
                  key={p.node.id}
                  value={p.node.id}
                >
                  {p.node.salaryName}
                </MenuItem>
              ))}
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
                label="Montant"
                name="amount"
                type="number"
                required
                size="small"
                value={formik.values.amount}
                onChange={formik.handleChange}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={
                  formik.touched.amount && typeof formik.errors.amount === 'string'
                    ? formik.errors.amount
                    : ''
                }
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
          >
            <MobileDatePicker
              label="Date"
              onChange={(newDate) => formik.setFieldValue('startDate', newDate)}
              value={formik.values.startDate}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
          >
            <MobileDatePicker
              label="Ajout date de fin"
              onChange={(newDate) => formik.setFieldValue('endDate', isSwitchOn ? newDate : null)}
              value={formik.values.endDate}
              disabled={!isSwitchOn}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={isSwitchOn}
                  onChange={handleSwitchChange}
                  name="allDay"
                />
              }
              label=""
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
          >
            Créer
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewExpenseForm;
