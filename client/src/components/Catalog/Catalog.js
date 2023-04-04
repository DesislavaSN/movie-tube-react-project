import styles from './Catalog.module.css';
import { useMovieContext } from '../../contexts/MovieContext';
import CatalogItem from './CatalogItem/CatalogItem';

export default function Catalog() {
    const  { movies } = useMovieContext();

    return (
        <section id={styles.catalog}>
            <h2>Movies Collection</h2>
            {movies.map(m => <CatalogItem key={m._id} {...m} />)}

            {movies.length === 0 && <h3>No movies yet!</h3>}
        </section>
    );
}
