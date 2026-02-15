
import styles from './Home.module.css'


export function Home(){


    return(
        <main className={styles.mainStyle}>
            <h1 className={styles.homeh1}>Welcome to BookDB.</h1>
            <p>Here you can search for books and give them a rating.</p>
        </main>
    )
}