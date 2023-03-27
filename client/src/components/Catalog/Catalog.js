import { useState, useEffect } from 'react';
import { getAllMovies } from '../../services/movieService';
import CatalogItem from './CatalogItem/CatalogItem';

export default function Catalog() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getAllMovies()
            .then(result => {
                // console.log(result);
                setMovies(result);
            });
    }, []);


    return (
        // < !--Catalog page-- >
        <section id="catalog">
            <h2>Movies Collection</h2>
            {movies.map(m => <CatalogItem key={m._id} {...m} />)}

            {movies.length === 0 && <h3>No movies yet!</h3>}
        </section>
    );
}


