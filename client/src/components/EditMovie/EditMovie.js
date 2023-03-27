export default function EditMovie() {
    return (
        <section id="edit">
            <div className="form">
                <h2>Edit Movie</h2>
                <form className="edit-form">
                    <input type="text" name="title" id="title" placeholder="Title" />
                    <input type="text" name="director" id="director" placeholder="Director" />
                    <input type="text" name="genre" id="genre" placeholder="Genre" />
                    <input type="text" name="country" id="country" placeholder="Country" />
                    <input type="number" name="year" id="year" placeholder="Year" />
                    <input type="number" name="duration" id="duration" placeholder="Duration" />
                    <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" />
                    <textarea id="description" name="description" placeholder="Description" rows="4" cols="50"></textarea>
                    <textarea id="casts" name="casts" placeholder="Casts" rows="4" cols="50"></textarea>
                    <button type="submit">post</button>
                </form>
            </div>
        </section>
    );
};
