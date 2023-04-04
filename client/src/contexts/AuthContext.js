import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import authServiceFactory from '../services/authServices';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useLocalStorage('auth', {});
    const navigate = useNavigate();
    const authService = authServiceFactory(auth.accessToken);

    async function onLoginSubmit(data) {
        
        const {email, password} = data;
        if (email === '' || password === '') {
            alert('Valid email & password are required!');
            return;
        }

        try {
            const result = await authService.login(data);
            // console.log('Login result:', result);
            setAuth(result);
            navigate('/catalog');
        } catch (error) {
            console.log('Login error>>>', error);
            alert(error.message);
            return;
        }
    }

    async function onRegisterSubmit(data) {
        const {confirmPassword, ...registerData} = data;
        if (confirmPassword !== registerData.password){
            throw new Error('Passwords do not match!');
        }

        try {
            const result = await authService.register(registerData);
            // console.log('Register result:', result);
            setAuth(result);
            navigate('/catalog');
        } catch (error) {
            console.log('Register error >>>', error);
            alert(error.message);
            return;
        }
    }

    async function onLogout() {
        await authService.logout();
        setAuth({});
        localStorage.clear();
    }

    const contextData = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        username: auth.username,
        isAuthenticated: !!auth.accessToken
    };

    return (
        <>
            <AuthContext.Provider value={contextData}>
                { children }
            </AuthContext.Provider>
        </>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
};

