import type { FC } from 'react';
import PropTypes from 'prop-types';
import { PDFViewer } from '@react-pdf/renderer';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import SvgIcon from '@mui/material/SvgIcon';

import type { Invoice } from 'src/types/invoice';

import { InvoicePdfDocument } from './invoice-pdf-document';
import { provider } from 'src/types/provider';

interface ProviderPdfDialogProps {
  provider?: provider;
  onClose?: () => void;
  open?: boolean;
}

export const InvoicePdfDialog: FC<ProviderPdfDialogProps> = (props) => {
  const { provider, onClose, open = false, ...other } = props;

  if (!provider) {
    return null;
  }

  return (
    <Dialog
      fullScreen
      open={open}
      {...other}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'background.paper',
            p: 2,
          }}
        >
          <Button
            color="inherit"
            startIcon={
              <SvgIcon>
                <ArrowLeftIcon />
              </SvgIcon>
            }
            onClick={onClose}
          >
            Close
          </Button>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <PDFViewer
            height="100%"
            style={{ border: 'none' }}
            width="100%"
          >
            <InvoicePdfDocument provider={provider} />
          </PDFViewer>
        </Box>
      </Box>
    </Dialog>
  );
};

InvoicePdfDialog.propTypes = {
  // @ts-ignore
  provider: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
