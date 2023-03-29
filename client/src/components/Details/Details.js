import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';
import { useMovieContext } from '../../contexts/MovieContext';
import { movieServiceFactory } from '../../services/movieService';
import { useService } from '../../services/useService';
import DeleteConfirm from './DeleteConfirm/DeleteConfirm';

import Review from './Review/Review';

export default function Details() {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const movieService = useService(movieServiceFactory);
    const { userId, isAuthenticated } = useAuthContext();
    const { onDeleteMovieSubmit } = useMovieContext();
    const [movie, setMovie] = useState({});
    const isOwner = userId === movie._ownerId;
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        movieService.getById(movieId)
            .then(result => {
                setMovie(result);
            });
    }, [movieId]);

    
    const onDeleteClick = () => {
        setShowDeleteConfirm(true);
    };

    const onDeleteMovie = async () => {
        await movieService.deleteMovie(movieId);
        onDeleteMovieSubmit(movieId);
        navigate('/catalog');
    };

    const onClose = () => {
        setShowDeleteConfirm(false);
    };

    return (
        <section id="details">
            <div id="details-wrapper">
                <div id="main-details-wrapper">
                    <img id="details-img" src={movie.imageUrl} alt={movie.title} />
                    <div id="movie-short-info">
                        <p id="details-title">{movie.title}</p>
                        <p>Genre: <span>{movie.genre}</span></p>
                        <p>Country: <span>{movie.country}</span></p>
                        <p>Year: <span>{movie.year}</span></p>
                        <p>Duration: <span>{movie.duration} min</span></p>

                        <div id="details-casts">
                            <h3>Casts</h3>
                            <span>
                                <ul>
                                    <li>{movie.casts}</li>
                                    <li>And more...</li>
                                </ul>
                            </span>
                        </div>
                    </div>
                </div>

                <div id="info-wrapper">
                    <div id="details-description">
                        <h3>Description</h3>
                        <p>{movie.description}</p>
                    </div>
                </div>

                {showDeleteConfirm && <DeleteConfirm movie={movie} onDeleteMovie={onDeleteMovie} onClose={onClose}/> }
                
                {isOwner && (
                    <div id="action-buttons">
                        <>
                            <Link to={`/catalog/${movieId}/edit`} id="edit-btn">Edit</Link>
                            <Link id="delete-btn" onClick={onDeleteClick}>Delete</Link>
                        </>
                    </div>
                )}

                {(!isOwner && isAuthenticated) && <Review />}

                <section id="all-comments">
                    <div className="form">
                        <h3>All Reviews:</h3>
                        <p>Desi: This Movie is amazing!This Movie is amazing!This Movie is amazing!This Movie is amazing!This
                            Movie is amazing!This Movie is amazing!This Movie is amazing!This Movie is amazing!This Movie is
                            amazing!</p>
                        <hr />
                        <p>Eva: Another great comment</p>
                        <hr />
                        <p>Peter: Another great comment</p>

                        {/* <!-- If there are no comments yet... --> */}
                        {/* <!-- <p>No comments yet!</p> --> */}
                    </div>
                </section>
            </div>
        </section>
    );
};
