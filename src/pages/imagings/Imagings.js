import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import Permissions from '../../app-components/Permissions';
import { fetchUserPermissions } from '../../user/userActions';
import { useNavigate } from 'react-router-dom';

const Imagings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const permissions = useSelector((state) => state.user.permissions || []);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    dispatch(fetchUserPermissions());
  }, [dispatch]);

  const hasPermission = (permission) => permissions.includes(permission);

  const handleButtonClick = (path, permission, message) => {
    if (hasPermission(permission)) {
      navigate(path);
    } else {
      setErrorMessage(message);
      setErrorModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setErrorModalOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Imaging Management
      </Typography>
      <Grid container spacing={3}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              handleButtonClick(
                '/imaging/view',
                Permissions.ViewImagings,
                'You do not have permission to view imaging requests.'
              )
            }
          >
            View Imaging Requests
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              handleButtonClick(
                '/imaging/new',
                Permissions.RequestImaging,
                'You do not have permission to create a new imaging request.'
              )
            }
          >
            New Imaging Request
          </Button>
        </Grid>
      </Grid>

      {/* Error Modal */}
      <Dialog open={errorModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>{errorMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Imagings;