import React, { useRef } from "react";
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import AspirationService from "../../Services/AspirationService";

function EditMilestone(props) {
    //Create references to the edit fields
    const textRef = useRef();

    //Handle submit here
    const handleSubmit = event => {
        event.preventDefault();
        //Create a new aspiration object to submit.
        const editedMilestone = {
            text: textRef.current.value
        };

        AspirationService.editMilestone(props.id, editedMilestone, props.aspirationId).then(data => {
            //After editing milestone, retrieve aspirations again.
            props.retrieveAspirations();
        });
    };

    return (
        <>
            <Modal show={props.editMilestoneShow} onHide={props.handleEditMilestoneClose}>
                <Modal.Header closeButton className="dim-background">
                    <Modal.Title>
                        <h2 className="font-light squeezed">Edit Milestone</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <div>
                        <form className="form-group my-3" onSubmit={handleSubmit}>
                            <input className="form-control form-control-lg mb-3" minLength="1" placeholder="Milestone" defaultValue={props.text} ref={textRef} required/>
                            <button className="btn btn-primary btn-lg btn-block mt-3 mb-3" type="submit" onClick={() => {
                                props.handleEditMilestoneClose();
                            }}>
                                Save <i className="fal fa-save"></i>
                            </button>
                        </form>
                        <hr className="mb-4"/>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditMilestone;