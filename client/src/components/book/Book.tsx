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
const [review, setReview] = useState<any>(null);
const [comment, setComment] = useState('');
const [rating, setRating] = useState(0);
const [isEditing, setIsEditing] = useState(false);
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

useEffect(() => {
  if (loggedInUser && bookId){
    fetchReview(loggedInUser.id, bookId);
  }
}, [loggedInUser, bookId]);

const fetchBook = async (id: string) => {
  setLoading(true);
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=${api_key}`);
    setBookData(response.data);
  } catch (error) {
    console.error('Failed to fetch book');
  } finally {
    setLoading(false);
  }
  
};

const fetchReview = async (userId:string, bookId:string) => {
  console.log("userid: " + userId + "bookid: " + bookId);
  try{

  const response = await axios.get(`http://localhost:8080/api/user-vote/${userId}/${bookId}`);
  setReview(response.data.vote);
  console.log(response.data.vote);

  } catch(error){
    console.log("Error fetching review");
  }
}

const handleRate = async (rating: number, comment: string) => {
  if (!bookId){
    return;
  }
  if (!bookId || rating === 0) {
  alert('Please select a rating');
  return;
}

  try {
    await axios.post('http://localhost:8080/api/vote', {
      userId: loggedInUser.id,
      bookId: bookId,  
      rating,
      comment,
      bookData: {
        title: bookData.volumeInfo.title,
        authors: bookData.volumeInfo.authors || [],
        thumbnail: bookData.volumeInfo.imageLinks?.thumbnail || bookData.volumeInfo.imageLinks?.smallThumbnail,
        description: bookData.volumeInfo.description,
        previewLink: bookData.volumeInfo.previewLink
      }
    });
    alert('Rating saved!');
    fetchReview(loggedInUser.id, bookId);  
  } catch (error: any) {
    console.error('Rating failed:', error);
    alert('Failed to save rating');
  }
};



function handleTextareaChange(e:any){
    setComment(e.target.value);
}

    return(
         
        <main>
      
          
          
          {loading && <p>Loading...</p>}

              {bookData && (        
            <div className={styles.bookInfo}>

              {bookData.volumeInfo.authors ?(
                <h1>{bookData.volumeInfo.title} - {bookData.volumeInfo.authors} </h1>
              ) : (
                <h1>{bookData.volumeInfo.title} </h1>
              )}
              {bookData.volumeInfo.imageLinks?.thumbnail ? (
              <img src={bookData.volumeInfo.imageLinks.thumbnail} alt={bookData.volumeInfo.title}/>
              ) : (
                <img src="../assets/icon.png" alt="No cover available"/>
              )}
              
              {bookData.volumeInfo.categories ? (
                <p className={styles.genreTag} >Genre: {bookData.volumeInfo.categories[0]}</p>
              ) : (
                <p>Genre: Unknown</p>
              )}
              {bookData.volumeInfo.description ?(
              <div className={styles.storyDiv}> <p className={styles.storyTag}>Story:</p> {parse(bookData.volumeInfo.description)}  </div>

              ) : (
              <div className={styles.storyDiv}> <p>Hmm. We (Blame google) dont know so much about this book.</p> <p>But please let us know if you like it.</p></div>
              )}
                    
              


                {loggedInUser && (
                  <div className={styles.reviewDiv}>
                    {review && !isEditing ? (
                      <div>
                        <p>Your rating: {'⭐'.repeat(review.rating)}</p>
                        {review.comment && <p>Comment: {review.comment}</p>}
                        <button onClick={() => {
                          setRating(review.rating);  
                          setComment(review.comment || '');  
                          setIsEditing(true);
                        }}>Edit review</button>
                      </div>
                    ) : (

                      <div> 
                        <p>{review ? 'Edit your review' : 'Read it? Add a review'}</p>
                        <textarea 
                          value={comment} 
                          rows={8} 
                          cols={40} 
                          placeholder='Book comment. Optional' 
                          onChange={handleTextareaChange}
                        />                         
                        <div className={styles.stars}>  
                          {[1, 2, 3, 4, 5].map(star => (
                            <button onClick={() => setRating(star)} key={star}>
                              {star <= rating ? '⭐' : '☆'}
                            </button>
                          ))}
                        </div>
                        <button onClick={() => {
                          handleRate(rating, comment);
                          setIsEditing(false);
                        }}>Save review</button>
                      </div>
                    )}
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