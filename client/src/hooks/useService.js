import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function useService(serviceFactory) {
    const {token} = useContext(AuthContext);
    const service = serviceFactory(token);
    return service;
}