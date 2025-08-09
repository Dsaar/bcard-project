import React from 'react';
import { Button } from '@mui/material';

const SortBtn = ({ onClick, order }) => {
  return (
    <Button variant="contained" onClick={onClick}>
      Sort {order === 'asc' ? 'A → Z' : 'Z → A'}
    </Button>
  );
};

export default SortBtn;
