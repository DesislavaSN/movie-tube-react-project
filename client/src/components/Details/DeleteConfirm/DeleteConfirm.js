
export default function DeleteConfirm({
    movie,
    onDeleteMovie, 
    onClose
}) {
    return (
        <section id="del-confirm">
            <div className="form del-confirm-modul">
                <h4>Are you sure you want to delete <span>{movie.title}</span> movie?</h4>
                <button className="conf-btn del" type="submit" onClick={onDeleteMovie}>Delete</button>
                <button className="conf-btn cancel" type="submit" onClick={onClose}>Cancel</button>
            </div>
        </section>
    );
}
