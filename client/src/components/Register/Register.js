import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import useForm from '../../hooks/useForm';


export default function Register() {
    const {onRegisterSubmit} = useAuthContext();
    const {formValues, onChangeHandler, onSubmit} = useForm({
        email: '',
        password: '',

    }, onRegisterSubmit);
    
    return (
        <section id="register">
            <div className="form">
                <h2>Register</h2>
                <form className="login-form" onSubmit={onSubmit}>
                    <input 
                        type="text" 
                        name="email" 
                        id="register-email" 
                        placeholder="email" 
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
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        id="confirmPassword" 
                        placeholder="confirm password"
                        value={formValues.confirmPassword}
                        onChange={onChangeHandler} 
                    />
                    <button type="submit">register</button>
                    <p className="message">Already registered? <Link to="/login">Login</Link></p>
                </form>
            </div>
        </section>
    );
};
