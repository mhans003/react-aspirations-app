const NewAspiration = (props) => {
    return(
        <div className="new-aspiration-wrapper">
            <div className="new-aspiration-overlay">
                <form className="px-1 px-sm-5 py-5" onSubmit={props.handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            name="title" 
                            value={props.title} 
                            onChange={props.onChange} 
                            className="form-control form-control-lg form-xl my-4" 
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
                            className="form-control form-control-lg form-xl my-4" 
                            placeholder="Description" 
                            required
                        />
                    </div>
                    <div className="text-center">
                        <button className="btn btn-lg btn-primary button-xl py-3 mt-5 px-5" type="submit">
                            Add <i className="fas fa-plus ml-1"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 

export default NewAspiration;