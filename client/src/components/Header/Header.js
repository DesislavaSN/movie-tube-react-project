import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export default function Header() {
    const { isAuthenticated, userEmail } = useContext(AuthContext);
    return (
        <header>
            {/* <!-- Navigation --> */}
            <Link id="logo" to="/"><i className="fa-solid fa-film"></i></Link>

            <nav>
                <div>
                    <Link to="/catalog">Catalog</Link>
                </div>

                {isAuthenticated ? (
                    <div className="user">
                        {/* <!-- Logged-in users --> */}
                        <Link to="/create-movie">Create Movie</Link>
                        <Link to="/logout">Logout</Link>
                        <span>Welcome back, {userEmail}</span>
                    </div>
                ) : (
                    <div className="guest">
                        {/* <!-- Guest users --> */}
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                )};
                                
            </nav>
        </header>
    );
};
