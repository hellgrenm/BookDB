import { useState } from 'react';
import styles from './SearchBar.module.css';
import { useNavigate } from 'react-router-dom';

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  
  const handleFormSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    console.log(searchQuery);
          navigate(`/books?search=${searchQuery}`); 
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type='text'
        className={styles.searchInput}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder='Search books...'
      />
    </form>
  );
}