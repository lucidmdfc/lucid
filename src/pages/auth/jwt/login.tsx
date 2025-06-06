import type { NextPage } from 'next';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormHelperText from '@mui/material/FormHelperText';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import type { AuthContextType } from 'src/contexts/auth/jwt';
import { GuestGuard } from 'src/guards/guest-guard';
import { IssuerGuard } from 'src/guards/issuer-guard';
import { useAuth } from 'src/hooks/use-auth';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { useRouter } from 'src/hooks/use-router';
import { useSearchParams } from 'src/hooks/use-search-params';
import { Layout as AuthLayout } from 'src/layouts/auth/classic-layout';
import { paths } from 'src/paths';
import { AuthIssuer } from 'src/sections/auth/auth-issuer';
import { Issuer } from 'src/utils/auth';
import { supabase } from 'src/libs/supabaseClient';
import { useState } from 'react';

interface Values {
  email: string;
  password: string;
  submit: null;
}

// const initialValues: Values = {
//   email: 'demo@devias.io',
//   password: 'Password123!',
//   submit: null,
// };
const initialValues: Values = {
  email: '',
  password: '',
  submit: null,
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Doit être une adresse email valide')
    .max(255)
    .required("L'email est requis"),
  password: Yup.string().max(255).required('Le mot de passe est requis'),
});
const Page: NextPage = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const { issuer, signIn } = useAuth<AuthContextType>();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) {
        console.log(error);
        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: error.message });
          helpers.setSubmitting(false);
        }
        return;
      }

      signIn('demo@devias.io', 'Password123!');
      if (isMounted()) {
        router.push(returnTo || paths.dashboard.index);
        // console.log('Login successful, redirecting...');
        // console.log('paths.dashboard.index:', paths.dashboard.index);
      }

      // try {
      //   await signIn(values.email, values.password);
      //   console.log(values);
      //   // if (isMounted()) {
      //   //   router.push(returnTo || paths.dashboard.index);
      //   // }

      // } catch (err) {
      //   console.error(err);

      //   if (isMounted()) {
      //     helpers.setStatus({ success: false });
      //     helpers.setErrors({ submit: err.message });
      //     helpers.setSubmitting(false);
      //   }
      // }
    },
  });

  usePageView();

  return (
    <>
      <Seo title="Login" />
      <div>
        <Card elevation={16}>
          <CardHeader
            subheader={
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Vous n'avez pas de compte ?
                <Link
                  component={RouterLink}
                  href={paths.auth.jwt.register}
                  underline="hover"
                  variant="subtitle2"
                >
                  Inscrivez-vous
                </Link>
              </Typography>
            }
            sx={{ pb: 0 }}
            title="Log in"
          />
          <CardContent>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  autoFocus
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Adresse e-mail"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Mot de passe"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>
              {formik.errors.submit && (
                <FormHelperText
                  error
                  sx={{ mt: 3 }}
                >
                  {formik.errors.submit as string}
                </FormHelperText>
              )}
              <Button
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                sx={{ mt: 2 }}
                type="submit"
                variant="contained"
              >
                Log In
              </Button>
            </form>
          </CardContent>
        </Card>
        <Stack
          spacing={3}
          sx={{ mt: 3 }}
        >
          <Alert severity="error">
            <div>
              Vous pouvez utiliser <b>user@gmail.com</b> et le mot de passe <b>123456</b>
            </div>
          </Alert>
          {/* <AuthIssuer issuer={issuer} /> */}
        </Stack>
      </div>
    </>
  );
};

Page.getLayout = (page) => (
  <IssuerGuard issuer={Issuer.JWT}>
    <GuestGuard>
      <AuthLayout>{page}</AuthLayout>
    </GuestGuard>
  </IssuerGuard>
);

export default Page;
