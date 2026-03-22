
import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'
import logo from '../../assets/logo.png'
import { SearchBar } from './Searchbar'



export function Header(){

    return(
        <header>
            <nav className={styles.navbar} >
     
                <div className={styles.smallMenu}>
                    <div className={styles.topRow}>
                    <img className={styles.navLogo} src={logo}></img>
                    <SearchBar />
                    </div>
                <div className={styles.linkRow}>
                    <NavLink to='/' className={styles.smallNavLinks}>Home</NavLink>
                    <NavLink to='/books' className={styles.smallNavLinks}>Books</NavLink>
                    <NavLink to='/about' className={styles.smallNavLinks}>About</NavLink>
                    <NavLink to='/myPage' className={styles.smallNavLinks}>My page</NavLink>
                </div>
                </div>
                <div className={styles.mainMenu}>
                    <img className={styles.navLogo} src={logo}></img>
                    <NavLink to='/' className={styles.navLinks}>Home</NavLink>
                    <NavLink to='/books' className={styles.navLinks}>Books</NavLink>
                    <SearchBar />
                    <NavLink to='/about' className={styles.navLinks}>About</NavLink>
                    <NavLink to='/myPage' className={styles.navLinks}>My page</NavLink>
                </div>
            </nav>
        </header>


    )
}

