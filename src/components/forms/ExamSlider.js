import React from 'react';

import { Slider } from '@mui/material';
import { styled } from '@mui/material/styles';

const marks = [
  { value: 3, label: 3 },
  { value: 6, label: 6 },
  { value: 9, label: 9 },
  { value: 12, label: 12 },
  { value: 15, label: 15 },
  { value: 45, label: 45 },
];

const NewSlider = styled(Slider)({
  height: '5px',
  color: 'FFFFFF',
  '& .MuiSlider-track': {
    border: 'none',
    background: `linear-gradient(
          90deg,
          rgb(255, 92, 1) 0%,
          rgba(255, 210, 95, 1) 100%
        )`,
  },
  '& .MuiSlider-rail': {
    backgroundColor: '#FFFFFF',
  },
  '& .MuiSlider-thumb': {
    width: '20px',
    height: '20px',
    backgroundColor: '#1B1B1B',
    border: '5px solid #FFD05D',
  },
  '& .MuiSlider-mark': {
    background: 'none',
  },
  '& .MuiSlider-markLabel': {
    color: '#FFFFFF',
  },
});

const ExamSlider = (props) => {
  return (
    <>
      <NewSlider
        value={props.range}
        onChange={props.onChange}

        min={3}
        max={45}
        marks={marks}
        step={null}
        scale={(x) => (x = 6)}
        
        required
      />
    </>
  );
};

export default ExamSlider;
