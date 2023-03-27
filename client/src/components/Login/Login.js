import { Link } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';
import useForm from '../../hooks/useForm';

export default function Login() {

    const { onLoginSubmit } = useAuthContext();
    const {formValues, onChangeHandler, onSubmit} = useForm({
        email: '',
        password: ''
    }, onLoginSubmit);

    return (
        <section id="login">
            <div className="form">
                <h2>Login</h2>
                <form className="login-form" onSubmit={onSubmit}>
                    <input 
                        type="text" 
                        id="email" 
                        name="email"
                        placeholder="yourEmail@gmail.com" 
                        value={formValues.email}
                        onChange={onChangeHandler}
                    />
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="password" 
                        value={formValues.password}
                        onChange={onChangeHandler}
                    />
                    <button type="submit">login</button>
                    <p className="message">
                        Not registered? <Link to="/register">Create an account</Link>
                    </p>
                </form>
            </div>
        </section>
    );
};
