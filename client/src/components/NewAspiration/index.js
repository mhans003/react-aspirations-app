const NewAspiration = (props) => {
    return(
        <form className="px-1 px-sm-5 py-3 mt-3" onSubmit={props.handleSubmit}>
            <div className="form-group">
                <input 
                    type="text" 
                    name="title" 
                    value={props.title} 
                    onChange={props.onChange} 
                    className="form-control form-control-lg form-xl" 
                    placeholder="New Aspiration" 
                    required
                />
            </div>
            <div className="form-group">
                <input 
                    type="text" 
                    name="description" 
                    value={props.description} 
                    onChange={props.onChange} 
                    className="form-control form-control-lg form-xl" 
                    placeholder="Description" 
                    required
                />
            </div>
            <button className="btn btn-lg btn-primary btn-block button-xl py-3" type="submit">
                Add <i className="fas fa-plus ml-1"></i>
            </button>
        </form>
    );
} 

export default NewAspiration;