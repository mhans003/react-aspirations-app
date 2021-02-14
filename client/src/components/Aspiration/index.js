import { useState } from "react";
import AspirationService from "../../Services/AspirationService";

import EditAspiration from "../EditAspiration";
import EditMilestone from "../EditMilestone";
import DeleteAspiration from "../DeleteAspiration";
import Message from "../Message";

import Container from "../Container";
import Row from "../Row";
import Col from "../Col";

const Aspiration = (props) => {
    //Initialize message state.
    const [message, setMessage] = useState(null);

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

        AspirationService.postMilestone(props.aspiration._id, milestone).then(data => {

            //Once returned, pull out the needed data from the response.
            const { message } = data;

            if(message) {
                setMessage(message);
            }

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
        AspirationService.deleteMilestone(props.aspiration._id, {id: event.target.getAttribute("milestoneid")}).then(data => {
            //After deleting milestone, retrieve aspirations again.
            props.retrieveAspirations();
        });
    }

    const handleToggleComplete = (event) => {
        AspirationService.toggleComplete(props.aspiration._id, {status: props.aspiration.status}).then(data => {
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
        <div className="card mx-sm-5 my-5">
            <div className="card-header">
                <h3 className="small-spacing font-light">{props.aspiration.title}</h3>
                <div>
                    <i> 
                        Status: <span className={`${props.aspiration.status === "In Progress" ? "text-muted" : "text-success"}`}>
                            {props.aspiration.status}
                        </span>
                    </i>
                    <button onClick={() => handleToggleComplete()} className={`btn btn-sm ml-2 ${props.aspiration.status === "In Progress" ? "fas fa-check btn-success" : "fas fa-undo btn-warning"}`}>
                    </button>
                </div>
                <hr/>
                <div className="text-center">
                    <Container>
                        <Row>
                            <Col size="col-6">
                                <button className="btn btn-info btn-lg btn-block fas fa-edit mx-auto" onClick={() => handleEditAspirationShow()}></button>
                            </Col>
                            <Col size="col-6">
                                <button className="btn btn-danger btn-lg btn-block fas fa-trash-alt mx-auto" onClick={() => handleDeleteAspirationShow()}></button>
                            </Col>
                        </Row>
                    </Container>
                </div>  
            </div>
            <div className="card-body">
                <p className="card-text"><i>{props.aspiration.description}</i></p>
                <ul>
                    {
                        props.aspiration.milestones ?
                        props.aspiration.milestones.map((milestone, index) => {
                            return (
                                <li className="font-light my-1" key={index}>
                                    {milestone.text}
                                    <button milestoneid={milestone.id} onClick={() => handleEditMilestoneShow(milestone.text, milestone.id, props.aspiration._id)} className="btn btn-sm btn-primary fas fa-edit ml-2">
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
                        <div className="input-group-append">
                            <button className="btn btn-outline-primary" type="submit">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
                {message ? <Message message={message}/> : null}
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