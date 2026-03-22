import styles from './About.module.css'
export function About(){

    return(
        <main className={styles.aboutMain}>
            <h1>About me:</h1>
            <p>As a book fan myself I always wanted somewhere to easily rate the books I have read as I tend to forget what I have read and not...</p>
            <p>This is a fun project for myself to learn more about React and Vite.</p>
        </main>
    )
}