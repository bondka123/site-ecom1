import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className='border border-gray-400 px-5 py-2 my-5 rounded-full flex items-center gap-4 w-3/4 sm:w-1/2 mx-auto'>
      <input 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='w-full text-sm outline-none bg-inherit' 
        type="text" 
        placeholder='Search Products...' 
      />
      <img 
        onClick={() => setShowSearch(false)}
        className='h-4 cursor-pointer'
        src={'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22black%22 stroke-width=%222%22%3E%3Cline x1=%221%22 y1=%221%22 x2=%2223%22 y2=%2223%22/%3E%3Cline x1=%2223%22 y1=%221%22 x2=%221%22 y2=%2223%22/%3E%3C/svg%3E'} 
        alt="Close" 
      />
    </div>
  ) : null;
};

export default SearchBar;
