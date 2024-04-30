/* eslint-disable react/prop-types */
import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
} from '@mui/material';

function Modal({ isOpen, onClose, graphs }) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Select a Graph</DialogTitle>
      <DialogContent className="bg-white p-4">
        {graphs.map((graph) => (
          <div className="mb-2">
            {graph.graphName}
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;
