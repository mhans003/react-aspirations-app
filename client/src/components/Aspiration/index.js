import { useState } from "react";
import AspirationService from "../../Services/AspirationService";

import EditAspiration from "../EditAspiration";

const Aspiration = (props) => {
    console.log(props.aspiration.milestones);

    //Set state for edit modal.
    const [editAspirationShow, setEditAspirationShow] = useState(false);

    const [milestone, setMilestone] = useState({text: "", id: ""});

    const handleSubmit = event => {
        event.preventDefault();

        console.log(milestone);

        AspirationService.postMilestone(props.aspiration._id, milestone).then(data => {
            console.log(data);
            //After adding milestone, retrieve aspirations again.
            props.retrieveAspirations();
        });
    }

    const onChange = event => {
        setMilestone({
            text: event.target.value,
            id: props.aspiration._id + (Math.floor(Math.random() * 999999) + 1) + (Math.floor(Math.random() * 999999) + 1)
        });
    }

    const resetForm = () => {
        setMilestone({text: "", id: ""});
    }

    const handleMilestoneDelete = (event) => {
        console.log(event.target.getAttribute("milestoneId"));
        AspirationService.deleteMilestone(props.aspiration._id, {id: event.target.getAttribute("milestoneId")}).then(data => {
            console.log(data);
            //After deleting milestone, retrieve aspirations again.
            props.retrieveAspirations();
        });
    }

    //Modal handlers
    const handleEditAspirationClose = () => setEditAspirationShow(false);
    const handleEditAspirationShow = () => setEditAspirationShow(true);

    return (
        <div className="card">
            <h5 className="card-header">
                {props.aspiration.title}
                <button className="btn btn-secondary fas fa-edit" onClick={() => handleEditAspirationShow()}></button>
                <button className="btn btn-danger fas fa-trash-alt"></button>
            </h5>
            <div className="card-body">
                <p className="card-text">{props.aspiration.description}</p>
                <ul>
                    {
                        props.aspiration.milestones ?
                        props.aspiration.milestones.map(milestone => {
                            return (
                                <li>
                                    {milestone.text}
                                    <button milestoneId={milestone.id} onClick={handleMilestoneDelete} class="btn btn-sm btn-danger fas fa-trash-alt">
                                    </button>
                                </li>
                            );
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
            <EditAspiration 
                title={props.aspiration.title} 
                description={props.aspiration.description} 
                id={props.aspiration._id}
                editAspirationShow={editAspirationShow}
                handleEditAspirationClose={handleEditAspirationClose}
                retrieveAspirations={props.retrieveAspirations}
            />
        </div>
    );
}

export default Aspiration;