import styles from './Profile.module.css';
import { useAuthContext } from '../../contexts/AuthContext';
import { useMovieContext } from '../../contexts/MovieContext';

export default function Profile() {
    const { userEmail, username, userId } = useAuthContext();
    const { movies } =  useMovieContext();
    const myPosts = movies.filter(m => m._ownerId === userId);
   
    return (
        <section id={styles.profile}>
            <div className={styles.form}>
                <h2>My Profile</h2>
                <div className={styles.profileContainer}>
                    <p>Username: <span>{username}</span></p>
                    <p>Email: <span>{userEmail}</span></p>
                    <p>Posts: <span>{myPosts.length}</span></p>
                </div>
                <hr />
                <div>
                    {myPosts.map(post => {
                        return (
                            <div key={post._id} className={styles.imgContainer}>
                                <p>Title: <span>{post.title}</span></p>
                                <img src={post.imageUrl} alt={post.title} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
