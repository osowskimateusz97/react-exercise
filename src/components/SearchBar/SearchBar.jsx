import React, { useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './SearchBar.module.scss';

const SearchBar = ({ setFilterValue }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    // It'll return all courses when value is empty
    if (!value) setFilterValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilterValue(searchValue);
  };
  return (
    <form onSubmit={handleSubmit} className={styles.search}>
      <Input
        value={searchValue}
        onChange={handleChange}
        className={styles.search__input}
        placeholderText='Enter course name or id..'
      />
      <Button
        type='submit'
        className={styles.search__btnSearch}
        buttonText='Search'
        variant='purple'
      />
    </form>
  );
};

export default SearchBar;
