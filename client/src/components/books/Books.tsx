import axios from "axios";
import {RemoveScroll} from 'react-remove-scroll';
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from './Books.module.css'
import { RateModal } from './RateMobal';

export function Books(){
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const api_key = import.meta.env.VITE_API_KEY;
  const [showRateModal, setShowRateModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);

  const openRateModal = (book: any) => {
    setSelectedBook(book);
    setShowRateModal(true);
  };

  const handleRate = async (rating: number) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!user.id) {
    alert('Please log in to rate books');
    return;
  }

  try {
    await axios.post('http://localhost:8080/api/vote', {
      userId: user.id,
      bookId: selectedBook.id,
      rating
    });
    console.log(`Rated ${rating} stars`);
  } catch (error: any) {
    console.error('Rating failed:', error);
    alert('Failed to save rating');
  }
};

  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      searchBooks(query);
    }
  }, [searchParams]);

    const searchBooks = async (query: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${api_key}&maxresults=10`
      );
      setBooks(response.data.items || []);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };
  const hasSearched = searchParams.get('search');

    return(
      <>
    <main>
      
    {!hasSearched && books.length === 0 && <h2>Results from a search will be displayed here.</h2>}
    {hasSearched && !loading && books.length === 0 && <h2>No results found for {searchParams.get('search')}.</h2>}
      {loading && <p>Loading...</p>}
    <div className={styles.resultsDiv}>

      {books.map((book: any) => (
        
        <div key={book.id} className={styles.book}>
          {book.volumeInfo.imageLinks?.smallThumbnail && (
            <img 
              src={book.volumeInfo.imageLinks.smallThumbnail} 
              alt={book.volumeInfo.title} 
            />
          )}
          <div className={styles.bookInfo}>
            <h3>
              <a 
                className={styles.bookLink} 
                href={book.volumeInfo.infoLink} 
                target="_blank"
                rel="noreferrer"
              >
                {book.volumeInfo.title}
              </a>
            </h3>
            <p>Author: {book.volumeInfo.authors?.join(', ')}</p>
            <p>{book.volumeInfo.description}</p>
            <button className={styles.rateBook} onClick={() => openRateModal(book)}>Rate ⭐ </button>
          </div>
        </div>
      ))}
    </div>

  </main>

    
    {showRateModal && selectedBook && (
    <RemoveScroll> 
      <RateModal 
        book={selectedBook}
        onClose={() => setShowRateModal(false)}
        onRate={handleRate}
      />
      </RemoveScroll>
    )}
  </>
)
}