import styles from './Home.module.css'
import { useNavigate } from "react-router-dom";


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
  const navigate = useNavigate();

    return(
        <>
        <main className={styles.mainStyle}>
            <h1 className={styles.homeh1}>Welcome to BookDB.</h1>
            <p>This is my in progess work of a IMDB similar site for books. The site uses Google Books for book data.</p>
            <p className={styles.bookTips}>Book suggestions</p>
            <div className={styles.popular}>
                
                <div className={styles.pBook} onClick={() => navigate("/book/WnrBDwAAQBAJ") }>
                <img src='https://books.google.com/books/content?id=WnrBDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl'></img> 
                <p className={styles.bookTitle}>Tender is the flesh</p> 
                <p className={styles.bookAuthor}>By: Agustina Bazterrica</p>           
                </div>

                <div className={styles.pBook} onClick={() => navigate("/book/63fYDwAAQBAJ") }>
                <img src='https://books.google.com/books/content?id=63fYDwAAQBAJ&printsec=frontcover&img=1&zoom=5'></img> 
                <p className={styles.bookTitle}> The Midnight Library</p>
                <p className={styles.bookAuthor}>By: Matt Haig</p>             
                </div>

            </div>
             <p className={styles.alreadyRead}>Already read them? Please consider voting.</p>
        </main>

    
  </>
)
}
