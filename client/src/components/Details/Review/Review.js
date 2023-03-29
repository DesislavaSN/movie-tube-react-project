
export default function Review() {
    return (
        <section id="comments">
            <div className="form review-form">
                <h2>Leave your review</h2>
                <form className="login-form">
                    <input type="text" name="username" id="username" placeholder="Name" />
                    <textarea id="description" name="description" placeholder="Review" rows="4" cols="50"></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </section>
    );
}
