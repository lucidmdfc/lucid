import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import { Box, Modal, Backdrop } from '@mui/material';

interface PdfViewerProps {
  pdfUrl: string;
  open: boolean;
  onClose: () => void;
}

export default function PdfViewer({ pdfUrl, open, onClose }: PdfViewerProps) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: {
          backdropFilter: 'blur(8px)', // Blurs the background
        },
      }}
    >
      <Box
        sx={{
          width: '80%',
          height: '80vh',
          bgcolor: 'background.paper',
          p: 2,
          borderRadius: 2,
          boxShadow: 24,
          overflow: 'hidden',
          border: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)', // Center the Box
        }}
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
        </Worker>
      </Box>
    </Modal>
  );
}
