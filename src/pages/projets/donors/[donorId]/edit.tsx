import { useEffect, type FC } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import { wait } from 'src/utils/wait';
import { NextPage } from 'next';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROJECT_BY_ID, GET_PROJECTS } from 'src/graphql/entities/projects/queries';
import { useRouter } from 'next/router';
import { GET_DONOR_BY_ID } from 'src/graphql/entities/donors/queries';
import { UPDATE_DONOR } from 'src/graphql/entities/donors/mutations';
import { useGetDonorByIdQuery, useUpdateDonorMutation } from 'src/hooks/generatedHook';

const Page: NextPage = () => {
  const router = useRouter();
  const { donorId } = router.query;
  console.log(donorId);
  const {
    loading: donorLoading,
    error: donorError,
    data: donorData,
    refetch: donorRefetsh,
  } = useGetDonorByIdQuery({
    variables: {
      id: Number(donorId),
    },
  });
  const donor = donorData?.donorsCollection?.edges?.[0]?.node;
  console.log(donor);

  const [updateDonor, { loading, error }] = useUpdateDonorMutation();
  console.log(error);
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      note: '',
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      phone: Yup.string().max(20).required('Phone is required'),
      note: Yup.string().max(1000),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const { data } = await updateDonor({
          variables: {
            set: {
              name: values.name,
              email: values.email,
              phone: values.phone,
              note: values.note,
            },
            filter: { id: { eq: Number(donorId) } },
            atMost: 1,
          },
        });
        await wait(500);
        toast.success('Project updated');
        helpers.setSubmitting(false);
      } catch (err) {
        toast.error('Something went wrong!');
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (donor) {
      formik.setValues({
        name: donor?.name || '',
        email: donor?.email || '',
        phone: donor?.phone || '',
        note: donor?.note || '',
        submit: null,
      });
    }
  }, [donor]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader title="Edit Project" />
        <CardContent sx={{ pt: 0 }}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="Name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                error={!!(formik.touched.name && formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                required
              />
            </Grid>

            <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="Email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={!!(formik.touched.email && formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                required
              />
            </Grid>

            <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                error={!!(formik.touched.phone && formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                required
              />
            </Grid>

            <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="Note"
                name="note"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.note}
                error={!!(formik.touched.note && formik.errors.note)}
                helperText={formik.touched.note && formik.errors.note}
              />
            </Grid>
          </Grid>
        </CardContent>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          flexWrap="wrap"
          spacing={3}
          sx={{ p: 3 }}
        >
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
          >
            Update
          </Button>
        </Stack>
      </Card>
    </form>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
