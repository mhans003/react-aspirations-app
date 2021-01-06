import { useState } from "react";
import AspirationService from "../../Services/AspirationService";

const Aspiration = (props) => {
    console.log(props.aspiration.milestones);

    const [milestone, setMilestone] = useState({text: ""});

    const handleSubmit = event => {
        event.preventDefault();

        AspirationService.postMilestone(props.aspiration._id, milestone).then(data => {
            console.log(data);
            props.retrieveAspirations();
        });
    }

    const onChange = event => {
        setMilestone({
            text: event.target.value
        });
    }

    const resetForm = () => {
        setMilestone({text: ""});
    }

    return (
        <div className="card">
            <h5 className="card-header">{props.aspiration.title}</h5>
            <div className="card-body">
                <p className="card-text">{props.aspiration.description}</p>
                <ul>
                    {
                        props.aspiration.milestones ?
                        props.aspiration.milestones.map(milestone => {
                            return <li>{milestone.text}</li>
                        }) : null
                    }
                </ul>
                <hr/>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" name="milestone" value={milestone.text} onChange={onChange} className="form-control" minLength="1" required placeholder="New Milestone"/>
                    </div>
                    <button className="btn btn-sm btn-primary btn-block" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Aspiration;