import { Link } from 'react-router-dom';
import styles from '../Catalog.module.css';

export default function CatalogItem({
    _id,
    title,
    imageUrl,
    director,
    year
}) {
    return (
        <div className={styles.movie}>
            <img src={imageUrl} alt={title} />
            <p>Director: <strong><span>{director}</span></strong></p>
            <p>Year: <strong><span>{year}</span></strong></p>
            <Link to={`/catalog/${_id}`} className={styles.detailsBtn}>Details</Link>
        </div>
    );
}
