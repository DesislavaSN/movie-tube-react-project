import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Register.module.css';
import { useAuthContext } from '../../contexts/AuthContext';
import useForm from '../../hooks/useForm';

export default function Register() {
    const { onRegisterSubmit } = useAuthContext();
    const { formValues, onChangeHandler, onSubmit } = useForm({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }, onRegisterSubmit);

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
                case 'username':
                    if (!value) {
                        stateObj[name] = 'Please enter username.'
                    }
                    break;
                case 'email':
                    if (!emailRegex.test(value)) {
                        stateObj[name] = 'Please eneter a valid email.'
                    }
                    break;
                case 'password':
                    if (!value) {
                        stateObj[name] = 'Please enter password.';
                    } else if (formValues.confirmPassword && value !== formValues.confirmPassword) {
                        stateObj['confirmPassword'] = 'Passwords do not match.';
                    } else {
                        stateObj['confirmPassword'] = formValues.confirmPassword ? '' : error.confirmPassword;
                    }
                    break;
                case 'confirmPassword':
                    if (!value) {
                        stateObj[name] = 'Please eneter confirm password.';
                    } else if (formValues.password && value !== formValues.password) {
                        stateObj[name] = 'Passwords do not match!';
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
        <section id={styles.register}>
            <div className={styles.form}>
                <h2>Register</h2>
                <form onSubmit={onSubmit}>
                    {error.username && <span className={styles.err}>{error.username}</span>}
                    <input
                        type="text"
                        name="username"
                        id="register-username"
                        placeholder="username"
                        value={formValues.username}
                        onChange={onChangeHandler}
                        onBlur={validateFormValues}
                    />
                    {error.email && <span className={styles.err}>{error.email}</span>}
                    <input
                        type="text"
                        name="email"
                        id="register-email"
                        placeholder="email"
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
                    {error.confirmPassword && <span className={styles.err}>{error.confirmPassword}</span>}
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="confirm password"
                        value={formValues.confirmPassword}
                        onChange={onChangeHandler}
                        onBlur={validateFormValues}
                    />

                    <button type="submit" disabled={!isValid}>register</button>
                    <p className={styles.message}>Already registered? <Link to="/login" className={styles.link}>Login</Link></p>
                </form>
            </div>
        </section>
    );
};
