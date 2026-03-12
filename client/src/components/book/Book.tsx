import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styles from './Book.module.css'
import parse from 'html-react-parser';





export function Book(){
const location = useLocation();
const { bookId } = useParams();
const [bookData, setBookData] = useState(location.state?.book || null);
const [loading, setLoading] = useState(false);
const api_key = import.meta.env.VITE_API_KEY;

const [loggedInUser, setLoggedInUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setLoggedInUser(user);
    }
  }, []);




useEffect(() => {
  if (!bookData && bookId) {
    fetchBook(bookId);
  }
}, [bookId, bookData]);

const fetchBook = async (id: string) => {
  setLoading(true);
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=${api_key}`);
    setBookData(response.data);
    console.log('Fetched data:', response.data);

  } catch (error) {
    console.error('Failed to fetch book');
  } finally {
    setLoading(false);
  }
  
};

    return(
         
        <main>
      
          
          
          {loading && <p>Loading...</p>}

              {bookData && (        
            <div className={styles.bookInfo}>
              <h1>{bookData.volumeInfo.title} - {bookData.volumeInfo.authors}</h1>
              <img src={bookData.volumeInfo.imageLinks.thumbnail}></img>
              <p>Genre: {bookData.volumeInfo.categories[0]}</p>
              <div className={styles.storyDiv}>Story: {parse(bookData.volumeInfo.description)}</div>
                    
              {loggedInUser && (
              <div className={styles.reviewDiv}>
                <p>Write a review</p>
              </div>
              )}
        

              </div>

            )}
         
        </main>
           
    )
}



/*


  const handleRate = async (rating: number, comment:string) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!user.id) {
    alert('Please log in to rate books');
    return;
  }
  
  try {
    await axios.post('http://localhost:8080/api/vote', {
      userId: user.id,
      bookId: selectedBook.id,
      rating,
      comment,
      bookData: {
        title: selectedBook.volumeInfo.title,
        authors: selectedBook.volumeInfo.authors || [],
        thumbnail: selectedBook.volumeInfo.imageLinks?.thumbnail || selectedBook.volumeInfo.imageLinks?.smallThumbnail,
        description: selectedBook.volumeInfo.description,
        previewLink: selectedBook.volumeInfo.previewLink
      }
    });
    console.log(`Rated ${rating} stars`);
    alert('Rating saved!');
  } catch (error: any) {
    console.error('Rating failed:', error);
    alert('Failed to save rating');
  }
};*/