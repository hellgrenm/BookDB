import logo from '../../assets/github.png';
import styles from './Footer.module.css'


export function Footer(){
    return (
        <footer className={styles.footer}>
            <a href="https://github.com/hellgrenm" target='_blank'> <img src={logo} className={styles.githubPic} alt="github logo"></img> </a>
        </footer>
    )
}