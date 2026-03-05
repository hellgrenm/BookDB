import { useState } from 'react';
import styles from './RateModal.module.css';




interface RateModalProps {
  book: any;
  onClose: () => void;
  onRate: (rating: number, comment : string) => void;
}



export function RateModal({ book, onClose, onRate }: RateModalProps) {
  const [comment, setComment] = useState('');
  
  function handleTextareaChange(e:any){
    setComment(e.target.value);
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Rate: {book.volumeInfo.title}</h2>
        <textarea rows={8} cols={40} placeholder='Book comment. Optional' onChange={handleTextareaChange}  /> 
        <div className={styles.stars}>  
          {[1, 2, 3, 4, 5].map(star => (
            <button 
              key={star} 
              onClick={() => {
                onRate(star, comment);
                onClose();
              }}
            >
              ⭐
            </button>
          ))}
    
        </div>
        
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}