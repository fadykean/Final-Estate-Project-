import React, { useEffect, useState } from 'react';
import { Button } from '../Button';
import { HeadItems } from './HeadItem';
import './Head.css';
import Filter from '../Filter/Filter';
import { useDispatch } from 'react-redux';
import { loadProducts } from '../../store/actions/productActions';
import location from '../../assets/imgs/location.png';
import bed from '../../assets/imgs/bed.png';
import { ReactComponent as Price } from '../../assets/imgs/price.svg';

function Head(props) {
  const [filterBy, setFilterBy] = useState({
    minPrice: 1000000,
    maxPrice: 8000000,
    minRooms: 1,
    maxRooms: 8,
    location: '',
  });

  const [showFilter, setShowFilter] = useState({
    price: false,
    bedrooms: false,
  });
  const dispatch = useDispatch();

  const toggleFilter = (name) => {
    name = name.toLowerCase();
    setShowFilter({ price: false, bedrooms: false, [name]: !showFilter[name] });
  };

  useEffect(() => {
    dispatch(loadProducts(filterBy));
  }, [filterBy]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'price') {
      setFilterBy({ ...filterBy, minPrice: value[0], maxPrice: value[1] });
    } else if (name === 'bedrooms') {
      setFilterBy({ ...filterBy, minRooms: value[0], maxRooms: value[1] });
    } else if (name === 'location') {
      setFilterBy({ ...filterBy, [name]: value });
    }
  };

  return (
    <nav className='NavbarItem'>
      <div className='menu-icon'>
        <i className='fas fa-bars'></i>
      </div>
      <div className='input-container'>
        <input
          type='text'
          placeholder='Search For location'
          name='location'
          onChange={handleChange}
        />
        <img src={location} className='icon' />
      </div>
      <ul className='nav-menu col'>
        <div className='flex'>
          {HeadItems.map((item, index) => {
            return (
              <li
                key={index}
                className={item.cName}
                href={item.url}
                onClick={() => toggleFilter(item.title)}
              >
                {item.title === 'Bedrooms' && (
                  <img src={bed} className='icon' />
                )}
                {item.title === 'Price' && <Price className='icon' />}
                {item.title}
              </li>
            );
          })}
        </div>
        {showFilter.price && (
          <Filter
            name='price'
            handleChange={handleChange}
            filterBy={filterBy}
          />
        )}
        {showFilter.bedrooms && (
          <Filter
            name='bedrooms'
            handleChange={handleChange}
            filterBy={filterBy}
          />
        )}
      </ul>

      <Button>My Preferences</Button>
    </nav>
  );
}

export default Head;
