import styles from './Home.module.css'
import { useEffect, useState } from "react";
import { RateModal } from '../books/RateMobal';
import {RemoveScroll} from 'react-remove-scroll';
import axios from "axios";

const book1 = {
  id: 'WnrBDwAAQBAJ',
  volumeInfo: {
    title: 'Tender is the flesh',
    authors: ['Agustina Bazterrica'],
    imageLinks: { thumbnail: 'https://books.google.com/books/content?id=WnrBDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl' },
    description: '',
    previewLink: 'https://play.google.com/store/books/details/Agustina_Bazterrica_Tender_Is_the_Flesh?id=WnrBDwAAQBAJ'
  }
};

const book2 = {
  id: '63fYDwAAQBAJ',
  volumeInfo: {
    title: 'The Midnight Library',
    authors: ['Matt Haig'],
    imageLinks: { thumbnail: 'https://books.google.com/books/content?id=63fYDwAAQBAJ&printsec=frontcover&img=1&zoom=5' },
    description: '',
    previewLink: 'https://books.google.com/books?id=63fYDwAAQBAJ'
  }
};

export function Home(){
    const [showRateModal, setShowRateModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState<any>(null);


    const openRateModal = (book: any) => {
    setSelectedBook(book);
    setShowRateModal(true);
  };

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
};


    return(
        <>
        <main className={styles.mainStyle}>
            <h1 className={styles.homeh1}>Welcome to BookDB.</h1>
            <p>This is my own interpretation of a IMDB similar site for books. The site used Google Books for book data.</p>
            <p className={styles.bookTips}>Book suggestions</p>
            <div className={styles.popular}>
                
                <div className={styles.pBook}><p className='pTitle'>Tender is the flesh - Agustina Bazterrica</p> 
                <a href='https://play.google.com/store/books/details/Agustina_Bazterrica_Tender_Is_the_Flesh?id=WnrBDwAAQBAJ' target='_blank'>  
                <img src='https://books.google.com/books/content?id=WnrBDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl'></img> 
                </a>
                 <button className={styles.rateBook} onClick={() => openRateModal(book1)}>Rate ⭐ </button> 
                </div>

                <div className={styles.pBook}><p> The Midnight Library - Matt Haig </p>
                <a href='https://books.google.com/books?id=63fYDwAAQBAJ&dq=Matt+Haig+The+Midnight+Library&hl=&source=gbs_api&redir_esc=y' target='_blank'>
                <img src='https://books.google.com/books/content?id=63fYDwAAQBAJ&printsec=frontcover&img=1&zoom=5'></img> 
                </a>
                <button className={styles.rateBook} onClick={() => openRateModal(book2)}>Rate ⭐ </button>
                </div>

            </div>
             <p className={styles.alreadyRead}>Already read them? Please consider voting.</p>
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
