import React from 'react';
import { Box, Button, Modal } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Set the worker to use locally from pdfjs-dist
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

const PdfPreviewModal = ({ open, onClose, pdfUrl }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="pdf-preview-modal-title"
      aria-describedby="pdf-preview-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{
        position: 'relative',
        width: '80%',
        height: '80%',
        backgroundColor: '#fff',
        overflow: 'auto',
        padding: '20px',
        boxSizing: 'border-box',
      }}>
        <Document
          file={pdfUrl}
          options={{ workerSrc: pdfjs.GlobalWorkerOptions.workerSrc }}
        >
          <Page pageNumber={1} />
        </Document>
        <Button
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            backgroundColor: '#ff6f6f',
            color: '#fff',
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default PdfPreviewModal;