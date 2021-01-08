import { useState } from "react";
import AspirationService from "../../Services/AspirationService";

import EditAspiration from "../EditAspiration";
import EditMilestone from "../EditMilestone";
import DeleteAspiration from "../DeleteAspiration";

const Aspiration = (props) => {
    console.log(props.aspiration.milestones);

    //Set state for edit modals.
    const [editAspirationShow, setEditAspirationShow] = useState(false);
    const [editMilestoneShow, setEditMilestoneShow] = useState(false);
    const [deleteAspirationShow, setDeleteAspirationShow] = useState(false);

    const [milestone, setMilestone] = useState({text: "", id: ""});

    //Keep track of text for milestone to edit
    const [milestoneText, setMilestoneText] = useState("");
    const [milestoneId, setMilestoneId] = useState("");
    const [aspirationId, setAspirationId] = useState("");

    const handleSubmit = event => {
        event.preventDefault();

        resetForm();

        console.log(milestone);

        AspirationService.postMilestone(props.aspiration._id, milestone).then(data => {
            console.log(data);
            //After adding milestone, retrieve aspirations again.
            props.retrieveAspirations();
        });
    }

    //Reset the form when submitted.
    const resetForm = () => {
        setMilestone({text: "", id: ""});
    }

    const onChange = event => {
        setMilestone({
            text: event.target.value,
            id: props.aspiration._id + (Math.floor(Math.random() * 999999) + 1) + (Math.floor(Math.random() * 999999) + 1)
        });
    }

    const handleMilestoneDelete = (event) => {
        console.log(event.target.getAttribute("milestoneid"));
        AspirationService.deleteMilestone(props.aspiration._id, {id: event.target.getAttribute("milestoneid")}).then(data => {
            console.log(data);
            //After deleting milestone, retrieve aspirations again.
            props.retrieveAspirations();
        });
    }

    //Modal handlers
    const handleEditAspirationClose = () => setEditAspirationShow(false);
    const handleEditAspirationShow = () => setEditAspirationShow(true);

    const handleDeleteAspirationClose = () => setDeleteAspirationShow(false);
    const handleDeleteAspirationShow = () => setDeleteAspirationShow(true);

    const handleEditMilestoneClose = () => setEditMilestoneShow(false);
    const handleEditMilestoneShow = (text, id, aspirationId) => {
        setMilestoneText(text);
        setMilestoneId(id);
        setAspirationId(aspirationId);
        setEditMilestoneShow(true);
    }

    return (
        <div className="card mx-3 my-2">
            <h4 className="card-header font-light squeezed">
                {props.aspiration.title}
                <hr/>
                <div className="text-center">
                    <button className="btn btn-secondary fas fa-edit ml-2" onClick={() => handleEditAspirationShow()}></button>
                    <button className="btn btn-danger fas fa-trash-alt ml-2" onClick={() => handleDeleteAspirationShow()}></button>
                </div>
                
            </h4>
            <div className="card-body">
                <p className="card-text"><i>{props.aspiration.description}</i></p>
                <ul>
                    {
                        props.aspiration.milestones ?
                        props.aspiration.milestones.map(milestone => {
                            return (
                                <li className="font-light">
                                    {milestone.text}
                                    <button milestoneid={milestone.id} onClick={() => handleEditMilestoneShow(milestone.text, milestone.id, props.aspiration._id)} className="btn btn-sm btn-secondary fas fa-edit ml-2">
                                    </button>
                                    <button milestoneid={milestone.id} onClick={handleMilestoneDelete} className="btn btn-sm btn-danger fas fa-trash-alt ml-2">
                                    </button>
                                </li>
                            );
                        }) : null
                    }
                </ul>
                <hr/>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input type="text" name="milestone" value={milestone.text} onChange={onChange} className="form-control" minLength="1" required placeholder="New Milestone"/>
                        <div class="input-group-append">
                            <button className="btn btn-outline-primary" type="submit">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <EditAspiration 
                title={props.aspiration.title} 
                description={props.aspiration.description} 
                id={props.aspiration._id}
                milestones={props.aspiration.milestones}
                editAspirationShow={editAspirationShow}
                handleEditAspirationClose={handleEditAspirationClose}
                retrieveAspirations={props.retrieveAspirations}
            />
            <EditMilestone
                text={milestoneText}
                id={milestoneId}
                aspirationId={aspirationId}
                editMilestoneShow={editMilestoneShow}
                handleEditMilestoneClose={handleEditMilestoneClose}
                retrieveAspirations={props.retrieveAspirations}
            />
            <DeleteAspiration
                title={props.aspiration.title}
                description={props.aspiration.description}
                id={props.aspiration._id}
                deleteAspirationShow={deleteAspirationShow}
                handleDeleteAspirationClose={handleDeleteAspirationClose}
                retrieveAspirations={props.retrieveAspirations}
            />
        </div>
    );
}

export default Aspiration;