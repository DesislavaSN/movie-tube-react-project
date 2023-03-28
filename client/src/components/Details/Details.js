import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMovieContext } from '../../contexts/MovieContext';
import { movieServiceFactory } from '../../services/movieService';
import { useService } from '../../services/useService';

export default function Details() {
    const {movieId} = useParams();
    const movieService = useService(movieServiceFactory);
    const { userId, isAuthenticated } = useMovieContext();
    const [movie, setMovie] = useState({});

    const isOwner = userId === movie._ownerId;
    console.log('Movie Owner:', movie._ownerId);
    console.log('User ID:', userId);
    // console.log('Is Owner >>>', isOwner);

    useEffect(() => {
        movieService.getById(movieId)
            .then(result => {
                setMovie(result);
            });
    }, [movieId]);

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
                                    {/* <li>Rebecca Field</li>
                                    <li>Bradley Cooper</li>
                                    <li>Marlon Williams</li>
                                    <li>Anthony Ramos</li>
                                    <li>Rafi Gavron</li> */}
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

                <div id="action-buttons">
                    {isOwner ? (
                        <>
                            <Link to="/catalog/moveId/edit" id="edit-btn">Edit</Link>
                            <Link to="/catalog/moveId/delete" id="delete-btn">Delete</Link>
                        </>
                    ) : (
                        <Link to="/catalog/moveId/comments" id="apply-btn">Comments</Link>
                    )}
                </div>

                <section id="comments">
                    <div className="form">
                        <h2>Leave your review</h2>
                        <form className="login-form">
                            <input type="text" name="username" id="username" placeholder="Username" />
                            <textarea id="description" name="description" placeholder="Review" rows="4" cols="50"></textarea>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </section>

                <section id="all-comments">
                    <div className="form">
                        <h3>All Comments:</h3>
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
