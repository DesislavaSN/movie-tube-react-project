import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './EditMovie.module.css';

import { movieServiceFactory } from '../../services/movieService';
import { useService } from '../../services/useService';
import { useMovieContext } from '../../contexts/MovieContext';
import useForm from '../../hooks/useForm';

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
                onChangeValues(result);
            })
            .catch(error => {
                console.log('Edit form Error>>>', error);
            });
    }, [movieId]);

    const [error, setError] = useState({
        title:'',
        director: '',
        genre: '',
        country: '',
        year: '',
        duration: '',
        imageUrl: '',
        description: '',
        casts: ''
    });

    const isValidLength = (e) => {
        const {name, value} = e.target;
        if (name === 'title' || name === 'director' || name === 'genre' || name === 'country' || name === 'description' || name === 'casts') {
            const match = value.length >= 3;
            setError(state => ({...state, [name]: !match}));
        }
    };

    const isPositive = (e) => {
        const number = Number(e.target.value);
        setError(state => ({...state, [e.target.name]: number <= 0}));
    };

    const isValidUrl = (e) => {
        const urlRegex = /^(https:\/)?\/.+$/gim;
        const {name, value} = e.target;
        const match = value.match(urlRegex);
        setError(state => ({...state, [name]: !match}));
    };

    const isValid = !Object.values(error).some(x => x);

   
    return (
        <section id={styles.edit}>
            <div className={styles.form}>
                <h2>Edit Movie</h2>
                <form className="edit-form" onSubmit={onSubmit}>
                    {error.title && <span className={styles.err}>Title is required and must be at least 3 chars long</span>}
                    <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        placeholder="Title" 
                        value={formValues.title}   
                        onChange={onChangeHandler} 
                        onBlur={isValidLength}
                    />
                    {error.director && <span className={styles.err}>Director is required and must be at least 3 chars long</span>}
                    <input 
                        type="text" 
                        name="director" 
                        id="director" 
                        placeholder="Director" 
                        value={formValues.director}   
                        onChange={onChangeHandler} 
                        onBlur={isValidLength}
                    />
                    {error.genre && <span className={styles.err}>Genre is required and must be at least 3 chars long</span>}
                    <input 
                        type="text" 
                        name="genre" 
                        id="genre" 
                        placeholder="Genre" 
                        value={formValues.genre}   
                        onChange={onChangeHandler} 
                        onBlur={isValidLength}
                    />
                    {error.country && <span className={styles.err}>Country is required and must be at least 3 chars long</span>}
                    <input 
                        type="text" 
                        name="country" 
                        id="country" 
                        placeholder="Country" 
                        value={formValues.country}   
                        onChange={onChangeHandler} 
                        onBlur={isValidLength}
                    />
                    {error.year && <span className={styles.err}>Year must be a positive number</span>}
                    <input 
                        type="number" 
                        name="year" 
                        id="year" 
                        placeholder="Year" 
                        value={formValues.year}   
                        onChange={onChangeHandler}    
                        onBlur={isPositive} 
                    />
                    {error.duration && <span className={styles.err}>Duration must be a positive number</span>}
                    <input 
                        type="number" 
                        name="duration" 
                        id="duration" 
                        placeholder="Duration" 
                        value={formValues.duration}   
                        onChange={onChangeHandler} 
                        onBlur={isPositive} 
                    />
                    {error.imageUrl && <span className={styles.err}>The image url must starts with 'http' or '/'.</span>}
                    <input 
                        type="text" 
                        name="imageUrl" 
                        id="imageUrl" 
                        placeholder="Image URL" 
                        value={formValues.imageUrl}   
                        onChange={onChangeHandler} 
                        onBlur={isValidUrl}
                    />
                    {error.description && <span className={styles.err}>Description is required and must be at least 3 chars long</span>}
                    <textarea 
                        id="description" 
                        name="description" 
                        placeholder="Description" 
                        rows="4" 
                        cols="50"
                        value={formValues.description}   
                        onChange={onChangeHandler} 
                        onBlur={isValidLength}
                    ></textarea>
                    {error.casts && <span className={styles.err}>Casts are required and must be at least 3 chars long</span>}
                    <textarea 
                        id="casts" 
                        name="casts" 
                        placeholder="Casts" 
                        rows="4" 
                        cols="50"
                        value={formValues.casts}   
                        onChange={onChangeHandler} 
                        onBlur={isValidLength}
                    ></textarea>
                    <button type="submit" disabled={!isValid} className={!isValid ? styles.invalid : ''}>post</button>
                </form>
            </div>
        </section>
    );
};
