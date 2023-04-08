import { Link } from 'react-router-dom';
import styles from './Login.module.css';

import { useAuthContext } from '../../contexts/AuthContext';
import useForm from '../../hooks/useForm';
import { useState } from 'react';

export default function Login() {

    const { onLoginSubmit } = useAuthContext();
    const {formValues, onChangeHandler, onSubmit} = useForm({
        email: '',
        password: ''
    }, onLoginSubmit);
 
    const [error, setError] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const validateFormValues = (e) => {
        const { name, value } = e.target;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/i;

        setError(state => {
            const stateObj = { ...state, [name]: '' };

            switch (name) {
                case 'email':
                    if (!emailRegex.test(value)) {
                        stateObj[name] = 'Please eneter a valid email.';
                    }
                    break;
                case 'password':
                    if (!value) {
                        stateObj[name] = 'Please eneter a valid password.';
                    }
                    break;
                
                default:
                    break;
            }

            return stateObj;
        });
    };

    const isValid = !Object.values(error).some(x => x);

    return (
        <section id={styles.login}>
            <div className={styles.form}>
                <h2>Login</h2>
                <form onSubmit={onSubmit}>
                    {error.email && <span className={styles.err}>{error.email}</span>}
                    <input 
                        type="text" 
                        id="email" 
                        name="email"
                        placeholder="email@gmail.com" 
                        value={formValues.email}
                        onChange={onChangeHandler}
                        onBlur={validateFormValues}
                    />
                    {error.password && <span className={styles.err}>{error.password}</span>}
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="password" 
                        value={formValues.password}
                        onChange={onChangeHandler}
                        onBlur={validateFormValues}
                    />
                    <button type="submit" disabled={!isValid}>login</button>
                    <p className={styles.message}>
                        Not registered? <Link to="/register" className={styles.link}>Create an account</Link>
                    </p>
                </form>
            </div>
        </section>
    );
};
