import { useState, useEffect, useRef } from 'react'
import styles from './MyPage.module.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";


interface Vote {
  book_id: string;
  rating: number;
  created_at: string;
  title: string;
  authors: string[];
  thumbnail: string;
  description: string;
  previewLink?: string;
  comment?: string;
}


export function MyPage(){
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);  
  const [userVotes, setUserVotes] = useState<Vote[]>([]);


  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

 
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setLoggedInUser(user);
      fetchUserVotes(user.id);
    }
  }, []);


const fetchUserVotes = async (userId: number) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/user-votes/${userId}`);
    setUserVotes(response.data.votes); 

  } catch (error) {
    console.error('Failed to fetch votes:', error);
  }
};




  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        username,
        password
      });
      const user = response.data.user;
      setLoggedInUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      setMessage(response.data.message);
      setUsername('');
      setPassword('');
      

      fetchUserVotes(user.id);
    } catch (error: any) {
      setMessage(error.response?.data?.error || error.message);
    }
  };

  const handleRemove = async (bookId: string) => {

    try {
        const response = await axios.delete("http://localhost:8080/api/remove", { data: {
        userId: loggedInUser.id,
        bookId
        }
      });
      setMessage(response.data.message);
      fetchUserVotes(loggedInUser.id);
    } catch (error :any) {
      setMessage(error.response?.data?.error || error.message);
    }
  }

  const handleSignUp = async () => {
    if (username.trim().length == 0 && usernameRef.current != null){
        usernameRef.current.focus();
        return;
    }
    else if (password.trim().length == 0 && passwordRef.current != null){
        passwordRef.current.focus();
        return;
    }
    try {
        const response = await axios.post("http://localhost:8080/api/signup", {
        username,
        password
      });
    setMessage(response.data.message);
    setUsername('');
    setPassword('');
    } catch (error : any) {
        console.log(error.message);
          setMessage(error.response?.data?.error || error.message);
    }
  }
    const handleLogout = () => {
    setLoggedInUser(null);
    setUserVotes([]);
    localStorage.removeItem('user');
  };

  if (loggedInUser) {
    return (
      <div className={styles.userPage}>
        <h1>Welcome, {loggedInUser.username}!</h1>
        <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
        
        <h2>Your Rated Books</h2>
        {userVotes.length === 0 ? (
          <p>You haven't rated any books yet.</p>
        ) : (
          <div className={styles.votesContainer}>
            {userVotes.map((vote) => {
          return (
            <div key={vote.book_id} className={styles.voteCard} onClick={() => navigate(`/book/${vote.book_id}`)}>
              {vote.thumbnail && (
                <img src={vote.thumbnail} alt={vote.title} /> 
              )}
              <div className={styles.voteInfo}>
                  <h3>{vote.title}</h3>
                <p>Author: {vote.authors?.join(', ')}</p>
                <p className={styles.rating}>
                  Your rating: {'⭐'.repeat(vote.rating)} ({vote.rating}/5)
                </p>
                {vote.comment && <p>Comment:{vote.comment}</p>}
                <p className={styles.date}>
                  Rated: {new Date(vote.created_at).toLocaleDateString()}
                </p>
                {confirmDelete == vote.book_id &&(
                  <div className={styles.confirmDiv}>
                  <p className={styles.confirmP}>Delete review?</p>
                   <button 
                  className={styles.yesBtn} 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(vote.book_id);
                  }}
                >Yes</button>
                  <button 
                  className={styles.noBtn} 
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmDelete(null);
                  }}
                >No</button>
                </div>
                )}
              {confirmDelete !== vote.book_id && (
                <button 
                  className={styles.removeBtn} 
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmDelete(vote.book_id);
                  }}
                >Remove rating</button>
              )}
              </div>
            </div>
          );
        })}
          </div>
        )}
      </div>
    );
  }

  if (!loggedInUser){
        return(
            <>
            <h1>Please log in</h1>
            <div className={styles.formDiv}>
                <form className={styles.loginForm} onSubmit={handleLogin} >

                    <label htmlFor='username' className={styles.loginLabel} >Username: </label>
                    <input type='text' ref={usernameRef} name='username' value={username} required
                    onChange={(e) => setUsername(e.target.value)}/>

                    <label htmlFor='password' className={styles.loginLabel} >Password: </label>
                    <input type='password' ref={passwordRef} name='password' value={password} required 
                    onChange={(e) => setPassword(e.target.value)}/>

                    <div className={styles.buttonDiv}>
                    <button className={styles.signupButton} type='button' onClick={handleSignUp}>Signup</button>
                    <button className={styles.loginButton} type='submit'>Login</button>
                    </div>
                </form>
                {message && <p className={styles.message}>{message}</p>}
            </div>
            </>
        )
  } 
  
}