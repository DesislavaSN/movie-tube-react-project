import styles from './Error.module.css';

export default function Error404 () {
    return (
        <section >
        <div className={styles.form}>
            <h2>404 Not Found</h2>
            <div >
                <p>The item you are looking for does not exist!</p>
            </div>
        </div>
    </section>
    );
};
