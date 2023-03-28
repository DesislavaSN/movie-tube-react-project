import { useMovieContext } from "../../contexts/MovieContext";
import useForm from "../../hooks/useForm";

export default function CreateMovie() {

    const { onCreateMovieSubmit } = useMovieContext();

    const {formValues, onChangeHandler, onSubmit} = useForm({
        title: '',
        director: '',
        genre: '',
        country: '',
        year: '',
        duration: '',
        imageUrl: '',
        description: '',
        casts:''
    }, onCreateMovieSubmit);

    return (
        <section id="create">
            <div className="form">
                <h2>Create Movie</h2>
                <form className="create-form" onSubmit={onSubmit}>
                    <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        placeholder="Title" 
                        value={formValues.title}
                        onChange={onChangeHandler}
                    />
                    <input 
                        type="text" 
                        name="director" 
                        id="director" 
                        placeholder="Director" 
                        value={formValues.director}
                        onChange={onChangeHandler}    
                    />
                    <input 
                        type="text" 
                        name="genre" 
                        id="genre" 
                        placeholder="Genre" 
                        value={formValues.genre}
                        onChange={onChangeHandler}     
                    />
                    <input 
                        type="text" 
                        name="country" 
                        id="country" 
                        placeholder="Country" 
                        value={formValues.country}
                        onChange={onChangeHandler}     
                    />
                    <input 
                        type="number" 
                        name="year" 
                        id="year" 
                        placeholder="Year" 
                        value={formValues.year}
                        onChange={onChangeHandler}     
                    />
                    <input 
                        type="number" 
                        name="duration" 
                        id="duration" 
                        placeholder="Duration" 
                        value={formValues.duration}
                        onChange={onChangeHandler}     
                    />
                    <input 
                        type="text" 
                        name="imageUrl" 
                        id="imageUrl" 
                        placeholder="Image URL" 
                        value={formValues.imageUrl}
                        onChange={onChangeHandler}     
                    />
                    <textarea 
                        id="description" 
                        name="description" 
                        placeholder="Description" 
                        rows="4" 
                        cols="50"
                        value={formValues.description}
                        onChange={onChangeHandler} 
                    ></textarea>
                    <textarea 
                        id="casts" 
                        name="casts" 
                        placeholder="Casts" 
                        rows="4" 
                        cols="50"
                        value={formValues.casts}
                        onChange={onChangeHandler} 
                    ></textarea>
                    <button type="submit">post</button>
                </form>
            </div>
        </section>
    );
};
