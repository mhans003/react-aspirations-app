const NewAspiration = (props) => {
    return(
        <form className="px-5 py-3" onSubmit={props.handleSubmit}>
            <div className="form-group">
                <input type="text" name="title" value={props.title} onChange={props.onChange} className="form-control form-control-lg" placeholder="New Aspiration" required/>
            </div>
            <div className="form-group">
                <input type="text" name="description" value={props.description} onChange={props.onChange} className="form-control form-control-lg" placeholder="Description" required/>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">
                Submit
            </button>
        </form>
    );
} 

export default NewAspiration;