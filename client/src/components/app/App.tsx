import { Routes, Route } from 'react-router-dom';
import {Home} from '../home/Home';
import { Books  } from "../books/Books";
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import { About } from '../about/About';
import {MyPage} from '../my page/MyPage';
import "./App.css";



function App() {
  /*
  const [array, setArray] = useState([]);

    const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    setArray(response.data.fruits);
    console.log(response.data.fruits);
  }
  useEffect(() => {
    fetchAPI();
  },[])
  */

  

  return (
    <>

      <Header />
      <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='/books' element= { <Books /> } />
        <Route path='/about' element= {<About />} />
        <Route path='/myPage' element= {<MyPage />}  />
      </Routes>
      <Footer />
 
    </>
  )
}

export default App


