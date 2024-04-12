import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button,
} from '@mui/material';

function Confirm({
  openDialog,
  handleCancel,
  handleConfirm,
  dialogTitle,
  dialogDesc,
}) {
  return (
    <Dialog
      open={openDialog}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialogDesc}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleConfirm} autoFocus>
          Clear
        </Button>
      </DialogActions>
    </Dialog>
  );
}

Confirm.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  dialogTitle: PropTypes.string.isRequired,
  dialogDesc: PropTypes.string.isRequired,
};

export default Confirm;
