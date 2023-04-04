
import useForm from '../../../hooks/useForm';
import styles from '../Details.module.css';

export default function Review({onReviewSubmit}) {
    const {formValues, onChangeHandler, onSubmit} = useForm({
        username: '',
        comments: ''
    },onReviewSubmit);

    return (
        <section id={styles.comments}>
            <div className={styles.form}>
                <h2>Leave your review</h2>
                <form onSubmit={onSubmit}>
                    <input 
                        type="text" 
                        name="username" 
                        id="username" 
                        placeholder="Name" 
                        value={formValues.username} 
                        onChange={onChangeHandler}   
                    />
                    <textarea 
                        id="comments" 
                        name="comments" 
                        placeholder="Review" 
                        rows="4" 
                        cols="50"
                        value={formValues.comments} 
                        onChange={onChangeHandler}  
                    ></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </section>
    );
}
