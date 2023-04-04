import { useState, useEffect, Fragment } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from './Details.module.css';

import { useAuthContext } from '../../contexts/AuthContext';
import { useMovieContext } from '../../contexts/MovieContext';

import { createReview, getAllReviews } from '../../services/commentsService';
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
        Promise.all([
            movieService.getById(movieId),
            getAllReviews(movieId)
        ])
            .then(([movieData, commentsData]) => {
                const result = {
                    ...movieData,
                    comments: commentsData
                };
                setMovie(result);
            })
            .catch(error => {
                console.log('Details error >>>', error);
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

    const onReviewSubmit = async (data) => {
        const result = await createReview(movieId, data);

        setMovie(state => ({
            ...state,
            comments: [
                ...state.comments,
                {...result}
            ]
        }));
    };

    return (
        <section id={styles.details}>
            <div id={styles.detailsWrapper}>
                <div id={styles.mainDetailsWrapper}>
                    <img src={movie.imageUrl} alt={movie.title} />
                    <div id={styles.movieShortInfo}>
                        <p id={styles.detailsTitle}>{movie.title}</p>
                        <p>Genre: <span>{movie.genre}</span></p>
                        <p>Country: <span>{movie.country}</span></p>
                        <p>Year: <span>{movie.year}</span></p>
                        <p>Duration: <span>{movie.duration} min</span></p>

                        <div id={styles.detailsCasts}>
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

                <div id={styles.infoWrapper}>
                    <div id={styles.detailsDescription}>
                        <h3>Description</h3>
                        <p>{movie.description}</p>
                    </div>
                </div>

                {showDeleteConfirm && <DeleteConfirm movie={movie} onDeleteMovie={onDeleteMovie} onClose={onClose}/> }
                
                {isOwner && (
                    <div id={styles.actionButtons}>
                        <>
                            <Link to={`/catalog/${movieId}/edit`} id="edit-btn" className={styles.linkBtn}>Edit</Link>
                            <Link id="delete-btn" className={styles.linkBtn} onClick={onDeleteClick}>Delete</Link>
                        </>
                    </div>
                )}

                {(!isOwner && isAuthenticated) && <Review onReviewSubmit={onReviewSubmit} />}

                <section id={styles.allComments}>
                    <div className={styles.form}>
                        <h3>All Reviews:</h3>
                        {movie.comments && Object.values(movie.comments).map(c => {
                            return (
                                <Fragment  key={c._id}>
                                    <p><em>{c.data.username}</em>: {c.data.comments}</p>
                                    <hr />
                                </Fragment>
                            );
                        })}

                        
                        {/* <!-- If there are no comments yet... --> */}
                        {!movie.comments?.length && (
                            <p>No comments yet!</p>
                        )}

                    </div>
                </section>
            </div>
        </section>
    );
};
