import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { useDialog } from 'src/hooks/use-dialog';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { paths } from 'src/paths';
import { getInitials } from 'src/utils/get-initials';
import { useRouter } from 'next/router';
import { providersApi } from 'src/api/providers';
import { provider } from 'src/types/provider';
import { InvoicePdfDocument } from './components/invoice-pdf-document';
import { InvoicePreview } from './components/invoice-preview';
import { InvoicePdfDialog } from './components/invoice-pdf-dialog';

const useProvider = (): provider | null => {
  const isMounted = useMounted();
  const [provider, setProvider] = useState<provider | null>(null);

  const handleProviderGet = useCallback(async () => {
    try {
      const response = await providersApi.getProvider();

      if (isMounted()) {
        setProvider(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handleProviderGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return provider;
};

const Page: NextPage = () => {
  const provider = useProvider();
  const dialog = useDialog();
  const router = useRouter();
  const { achatId } = router.query;

  usePageView();

  if (!provider) {
    return null;
  }
  return (
    <>
      <Seo title="Prestataire et fournisseurs: Prestataire détails" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack
            divider={<Divider />}
            spacing={4}
          >
            <Stack spacing={4}>
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.dashboard.achats.search}
                  sx={{
                    alignItems: 'center',
                    display: 'inline-flex',
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2">Prestataire et fournisseurs</Typography>
                </Link>
              </div>
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                  <Avatar
                    sx={{
                      height: 42,
                      width: 42,
                    }}
                  >
                    {getInitials(provider.nom)}
                  </Avatar>
                  <div>
                    <Typography variant="h4">{achatId}</Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                    >
                      {provider.nom}
                    </Typography>
                  </div>
                </Stack>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                  <Button
                    color="inherit"
                    onClick={dialog.handleOpen}
                  >
                    Preview
                  </Button>
                  <PDFDownloadLink
                    document={<InvoicePdfDocument provider={provider} />}
                    fileName="provider"
                    style={{ textDecoration: 'none' }}
                  >
                    <Button
                      color="primary"
                      variant="contained"
                    >
                      Download
                    </Button>
                  </PDFDownloadLink>
                </Stack>
              </Stack>
            </Stack>
            <InvoicePreview provider={provider} />
          </Stack>
        </Container>
      </Box>
      <InvoicePdfDialog
        provider={provider}
        onClose={dialog.handleClose}
        open={dialog.open}
      />
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
