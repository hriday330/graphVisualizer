import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Menu, MenuItem } from '@mui/material';
import graphAlgorithms from '../../algorithms/graphAlgorithms';

function SplitButton({ selectedOption, options, onClick }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleButtonClick = () => {
    onClick(selectedOption);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (option) => {
    setAnchorEl(null);
    onClick(option);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-controls="split-button-menu"
        aria-haspopup="true"
        onClick={handleButtonClick}
        className="px-4 py-2 text-blue-500 rounded-l-md shadow-md cursor-pointer focus:outline-none focus:ring focus:ring-blue-300"
      >
        {selectedOption ? selectedOption.name : 'Select Algorithm'}
      </Button>
      <Button
        onClick={handleMenuClick}
        className="px-2 py-2 text-blue-500 rounded-r-md shadow-md cursor-pointer focus:outline-none focus:ring focus:ring-blue-300"
      >
        ▼
      </Button>
      <Menu
        id="split-button-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'split-button',
        }}
        className="w-60 bg-white border border-gray-300 rounded-md shadow-md"
      >
        {options.map((option) => (
          <MenuItem
            key={option.id}
            onClick={() => handleMenuItemClick(option)}
            className="px-4 py-2 hover:bg-gray-100"
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

SplitButton.propTypes = {
  selectedOption: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
  }),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

SplitButton.defaultProps = {
  selectedOption: graphAlgorithms[0],
};
export default SplitButton;
