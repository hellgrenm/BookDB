import styles from './RateModal.module.css';

interface RateModalProps {
  book: any;
  onClose: () => void;
  onRate: (rating: number) => void;
}

export function RateModal({ book, onClose, onRate }: RateModalProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Rate: {book.volumeInfo.title}</h2>
        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map(star => (
            <button 
              key={star} 
              onClick={() => {
                onRate(star);
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