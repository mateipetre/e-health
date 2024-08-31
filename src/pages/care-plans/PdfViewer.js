// src/components/PdfViewer.js

import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Box, Button, Typography } from '@mui/material';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'; // Optional: to include annotation layers

const PdfViewer = ({ pdfUrl, onClose }) => {
  const [numPages, setNumPages] = useState(null);

  // Handle the number of pages loaded
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        zIndex: 1500,
        overflow: 'auto',
        padding: '20px',
      }}
    >
      <Button
        onClick={onClose}
        sx={{ position: 'absolute', top: 20, right: 20, backgroundColor: '#ff6f6f', color: '#fff' }}
      >
        Close
      </Button>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<Typography>Loading PDF...</Typography>}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={index} pageNumber={index + 1} width={1000} />
          ))}
        </Document>
      </Box>
    </Box>
  );
};

export default PdfViewer;