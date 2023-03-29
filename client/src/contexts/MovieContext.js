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

    const onEditMovieSubmit = async (data) => {
        const editMovie = await movieService.edit(data._id, data);
        console.log(editMovie);
        setMovies(state => state.map(s => s._id === data._id ? editMovie : s));
        navigate(`/catalog/${data._id}`);
    };

    const onDeleteMovieSubmit = (movieId) => {
        setMovies(state => state.filter(movie => movie._id !== movieId));
    }

    const contextMovie = {
        onCreateMovieSubmit,
        onDeleteMovieSubmit,
        onEditMovieSubmit,
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
