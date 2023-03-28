import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { movieServiceFactory } from "../services/movieService";

export const MovieContext = createContext();

export const MovieProvider = ({ children}) => {
    const movieService = movieServiceFactory();
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        movieService.getAllMovies()
            .then(result => {
                setMovies(result);
            });
    }, []);

    const onCreateMovieSubmit = async (data) => {
        // console.log(data);
        const newMovie = await movieService.create(data);
        setMovies(state => [...state, newMovie]);
        navigate('/catalog');
    }

    const contextMovie = {
        onCreateMovieSubmit,
        movies,

    }

    return (
        <MovieContext.Provider value={contextMovie}>
            {children}
        </MovieContext.Provider>
    );
}

export const useMovieContext = () => {
    const context = useContext(MovieContext);
    return context;
}