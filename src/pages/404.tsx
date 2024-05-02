import type { NextPage } from 'next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';

import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { paths } from 'src/paths';

const Page: NextPage = () => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  usePageView();

  return (
    <>
      <Seo title="Erreur : Page non trouvée" />
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          py: '80px',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 6,
            }}
          >
            <Box
              alt="Non trouvé"
              component="img"
              src="/assets/errors/error-404.png"
              sx={{
                height: 'auto',
                maxWidth: '100%',
                width: 400,
              }}
            />
          </Box>
          <Typography
            align="center"
            variant={mdUp ? 'h1' : 'h4'}
          >
            404 : La page que vous recherchez n'est pas ici
          </Typography>
          <Typography
            align="center"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Vous avez essayé une route douteuse ou vous êtes arrivé ici par erreur. Quoi qu'il en
            soit, essayez d'utiliser la navigation.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6,
            }}
          >
            <Button
              component={RouterLink}
              href={paths.index}
            >
              Retour à la page d'accueil
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Page;
