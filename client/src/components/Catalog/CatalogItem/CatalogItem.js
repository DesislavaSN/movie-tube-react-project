import { Link } from 'react-router-dom';

export default function CatalogItem({
    _id,
    title,
    imageUrl,
    director,
    year
}) {
    return (
        <div className="movie">
            <img src={imageUrl} alt={title} />
            <p>Director: <strong><span className="director">{director}</span></strong></p>
            <p>Year: <strong><span className="year">{year}</span></strong></p>
            <Link to={`/catalog/${_id}`} className="details-btn">Details</Link>
        </div>
    );
}
