import { useEffect } from 'react';
import { useParams } from "react-router-dom";

import styles from './EditMovie.module.css';

import { movieServiceFactory } from "../../services/movieService";
import { useService } from "../../services/useService";
import { useMovieContext } from "../../contexts/MovieContext";
import useForm from "../../hooks/useForm";


export default function EditMovie() {

    const { onEditMovieSubmit } = useMovieContext();
    const { movieId } = useParams();
    const movieService = useService(movieServiceFactory);

    const {formValues, onChangeHandler, onSubmit, onChangeValues} = useForm({
        title: '',
        director: '',
        genre: '',
        country: '',
        year: '',
        duration: '',
        imageUrl: '',
        description: '',
        casts:''
    }, onEditMovieSubmit);

    useEffect(() => {
        movieService.getById(movieId)
            .then(result => {
                // console.log('edit form result >>>', result);
                onChangeValues(result);
            })
            .catch(error => {
                console.log('Edit form Error>>>', error);
            });
    }, [movieId]);


    return (
        <section id={styles.edit}>
            <div className={styles.form}>
                <h2>Edit Movie</h2>
                <form className="edit-form" onSubmit={onSubmit}>
                    <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        placeholder="Title" 
                        value={formValues.title}   
                        onChange={onChangeHandler} 
                    />
                    <input 
                        type="text" 
                        name="director" 
                        id="director" 
                        placeholder="Director" 
                        value={formValues.director}   
                        onChange={onChangeHandler}     
                    />
                    <input 
                        type="text" 
                        name="genre" 
                        id="genre" 
                        placeholder="Genre" 
                        value={formValues.genre}   
                        onChange={onChangeHandler} 
                    />
                    <input 
                        type="text" 
                        name="country" 
                        id="country" 
                        placeholder="Country" 
                        value={formValues.country}   
                        onChange={onChangeHandler} 
                    />
                    <input 
                        type="number" 
                        name="year" 
                        id="year" 
                        placeholder="Year" 
                        value={formValues.year}   
                        onChange={onChangeHandler}     
                    />
                    <input 
                        type="number" 
                        name="duration" 
                        id="duration" 
                        placeholder="Duration" 
                        value={formValues.duration}   
                        onChange={onChangeHandler} 
                    />
                    <input 
                        type="text" 
                        name="imageUrl" 
                        id="imageUrl" 
                        placeholder="Image URL" 
                        value={formValues.imageUrl}   
                        onChange={onChangeHandler} 
                    />
                    <textarea 
                        id="description" 
                        name="description" 
                        placeholder="Description" 
                        rows="4" 
                        cols="50"
                        value={formValues.description}   
                        onChange={onChangeHandler} 
                    ></textarea>
                    <textarea 
                        id="casts" 
                        name="casts" 
                        placeholder="Casts" 
                        rows="4" 
                        cols="50"
                        value={formValues.casts}   
                        onChange={onChangeHandler} 
                    ></textarea>
                    <button type="submit">post</button>
                </form>
            </div>
        </section>
    );
};
