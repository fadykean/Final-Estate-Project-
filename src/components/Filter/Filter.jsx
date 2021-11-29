import { Slider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './Filter.css';
function Filter({ handleChange, name, filterBy }) {
  const [values, setValues] = useState([]);
  useEffect(() => {}, []);

  useEffect(() => {
    if (name === 'price') {
      setValues([filterBy.minPrice, filterBy.maxPrice]);
    } else if (name === 'bedrooms') {
      setValues([filterBy.minRooms, filterBy.maxRooms]);
    }
  }, [filterBy]);

  return (
    <div className='filter'>
      <Slider
        value={values} // [2,8]
        onChange={handleChange}
        valueLabelDisplay='auto'
        name={name}
        max={name === 'price' ? 10000000 : 8}
      />
      <div className='values flex space-between'>
        <div className='value'>
          <h2>From</h2>
          <div className='border'>{values[0]}</div>
        </div>
        <div className='value'>
          <h2>To</h2>
          <div className='border'>{values[1]}</div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
