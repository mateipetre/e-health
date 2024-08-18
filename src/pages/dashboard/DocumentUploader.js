import React, { useEffect, useState } from 'react';
import {
  Box, Button, List, ListItem, ListItemText, Modal, Typography, Link,
} from '@mui/material';
import { styled } from '@mui/system';

const pastelBlue = '#6faaff';
const pastelRed = '#ff6f6f';

const HiddenInput = styled('input')({
  display: 'none',
});

const DocumentUploader = () => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [open, setOpen] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  // Load uploaded documents from session storage
  useEffect(() => {
    const storedDocuments = JSON.parse(sessionStorage.getItem('uploadedDocuments'));
    if (storedDocuments) {
      setUploadedDocuments(storedDocuments);
    }
  }, []);

  // Handle file upload and preview
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      const fileUrl = URL.createObjectURL(uploadedFile);
      setFile(uploadedFile);
      setFilePreview(fileUrl);
      setOpen(true);
    }
  };

  // Save document and update session storage
  const handleSaveDocument = () => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      const updatedDocuments = [...uploadedDocuments, { name: file.name, url: fileUrl }];
      setUploadedDocuments(updatedDocuments);
      sessionStorage.setItem('uploadedDocuments', JSON.stringify(updatedDocuments));
      setFile(null);
      setFilePreview(null);
      setOpen(false);
    }
  };

  const handleClosePreview = () => {
    setFile(null);
    setFilePreview(null);
    setOpen(false);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, color: pastelBlue }}>
        Upload Documents
      </Typography>

      <label htmlFor="document-upload">
        <HiddenInput
          accept=".jpg,.png,.pdf"
          id="document-upload"
          type="file"
          onChange={handleFileUpload}
        />
        <Button
          variant="contained"
          component="span"
          sx={{
            backgroundColor: pastelRed,
            '&:hover': { backgroundColor: '#e64a19' },
            textTransform: 'none',
            mb: 2,
          }}
        >
          Upload Document
        </Button>
      </label>

      {/* Display Uploaded Documents */}
      <Box>
        <Typography variant="h6" sx={{ mb: 2, color: pastelBlue }}>
          Uploaded Documents
        </Typography>
        <List>
          {uploadedDocuments.map((doc, index) => (
            <ListItem key={index}>
              <Link href={doc.url} target="_blank" rel="noopener noreferrer">
                <ListItemText
                  primary={doc.name}
                  sx={{ cursor: 'pointer', color: pastelBlue, textDecoration: 'underline' }}
                />
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Document Preview Modal */}
      <Modal
        open={open}
        onClose={handleClosePreview}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            bgcolor: 'background.paper',
            border: `2px solid ${pastelBlue}`,
            boxShadow: 24,
            p: 4,
          }}
        >
          {filePreview && file.type.includes('pdf') ? (
            <iframe
              src={filePreview}
              style={{ width: '100%', height: '80vh' }}
              title="Document Preview"
            />
          ) : (
            <img
              src={filePreview}
              alt="Document Preview"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          )}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClosePreview}
              sx={{ backgroundColor: pastelRed, '&:hover': { backgroundColor: '#e64a19' } }}
            >
              Close
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveDocument}
              sx={{ backgroundColor: pastelBlue, '&:hover': { backgroundColor: '#005bb5' } }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default DocumentUploader;