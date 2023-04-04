import styles from './DeleteConfirm.module.css';

export default function DeleteConfirm({
    movie,
    onDeleteMovie, 
    onClose
}) {
    return (
        <section id={styles.delConfirm}>
            <div className={styles.form}>
                <h4>Are you sure you want to delete <span>{movie.title}</span> movie?</h4>
                <button className={styles.confBtnDel} type="submit" onClick={onDeleteMovie}>Delete</button>
                <button className={styles.confBtnCancel} type="submit" onClick={onClose}>Cancel</button>
            </div>
        </section>
    );
}
