import { Routes, Route } from 'react-router-dom';
import {Home} from '../home/Home';
import { Books  } from "../books/Books";
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import { About } from '../about/About';
import {MyPage} from '../my page/MyPage';
import {NotFound} from '../notfound/NotFound';
import {Book} from '../book/Book';
import "./App.css";



function App() {

  return (
    <>

      <Header />
      <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='/books' element= { <Books /> } />
        <Route path='/about' element= {<About />} />
        <Route path='/myPage' element= {<MyPage />}  />
        <Route path='/book/:bookId' element = {<Book />} />
        <Route path='*' element= {<NotFound />} />
      </Routes>
      <Footer />
 
    </>
  )
}

export default App


