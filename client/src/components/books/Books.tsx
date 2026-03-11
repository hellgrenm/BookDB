import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from './Books.module.css'


export function Books(){
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const api_key = import.meta.env.VITE_API_KEY;

  const navigate = useNavigate();



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
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${api_key}&maxresults=20`
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
        
        <div key={book.id} className={styles.book} onClick={() => navigate(`/book/${book.id}`, { state: {book}} )} >
          {book.volumeInfo.imageLinks?.smallThumbnail && (
            <img 
              src={book.volumeInfo.imageLinks.smallThumbnail} 
              alt={book.volumeInfo.title} 
            />
          )}
          <div className={styles.bookInfo}>
            <h3>
                {book.volumeInfo.title}            
             </h3>
            <p>Author: {book.volumeInfo.authors?.join(', ')}</p>
            <p>{book.volumeInfo.description}</p>

          </div>
        </div>
      ))}
    </div>

  </main>

    

  </>
)
}