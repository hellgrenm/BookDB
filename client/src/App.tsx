import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [array, setArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);




  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api");
        setArray(response.data.fruits);
      } catch (err) {
        setError((err as Error).message) ;
      } finally {
        setLoading(false);
      }
    };
    fetchAPI();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong: {error}</p>;

  return (
    <>
      <div>
        {
          array.map((fruit, index)=>(
            <div key={index}>
              <p>{fruit}</p>
              <br></br>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
