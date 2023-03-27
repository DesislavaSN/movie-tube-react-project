import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import authServiceFactory from '../services/authServices';

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [auth, setAuth] = useLocalStorage('auth', {});
    const navigate = useNavigate();
    const authService = authServiceFactory(auth.accessToken);

    async function onLoginSubmit(data) {
        try {
            const result = await authService.login(data);
            // console.log('Login result:', result);
            setAuth(result);
            navigate('/catalog');
        } catch (error) {
            console.log('Email ot password do not match!');
            console.log('Login error>>>', error);
        }
    }

    async function onRegisterSubmit(data) {
        const {confirmPassword, ...registerData} = data;
        if (confirmPassword !== registerData.password){
            throw new Error('Passwords do not match!');
        }

        try {
            const result = await authService.register(registerData);
            setAuth(result);
            navigate('/catalog');
        } catch (error) {
            console.log('Register error >>>', error);
        }
    }

    async function onLogout() {
        await authService.logout();
        setAuth({});
        window.localStorage.clear();
    }

    const contextData = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken
    };

    return (
        <>
            <AuthContext.Provider value={contextData}>
                { children }
            </AuthContext.Provider>
        </>
    );
}

export function useAuthContext () {
    const context = useContext(AuthContext);
    return context;
}
