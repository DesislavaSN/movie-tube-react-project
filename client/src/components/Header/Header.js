import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useAuthContext } from '../../contexts/AuthContext';

export default function Header() {
    const { isAuthenticated, username } = useAuthContext();
    return (
        <header>
            {/* <!-- Navigation --> */}
            <Link id={styles.logo} to="/"><i className="fa-solid fa-film"></i></Link>

            <nav>
                <div>
                    <Link to="/catalog">Catalog</Link>
                </div>

                {isAuthenticated ? (
                    <div className={styles.user}>
                        {/* <!-- Logged-in users --> */}
                        <Link to="/create-movie">Create Movie</Link>
                        <Link to="/profile">My Profile</Link>
                        <Link to="/logout">Logout</Link>
                        <span>Welcome back, {username}</span>
                    </div>
                ) : (
                    <div className={styles.guest}>
                        {/* <!-- Guest users --> */}
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                )};
                                
            </nav>
        </header>
    );
};
