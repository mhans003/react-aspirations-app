import React, { useRef } from "react";
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import AspirationService from "../../Services/AspirationService";

function EditAspiration(props) {
    //Create references to the edit fields
    const titleRef = useRef();
    const descriptionRef = useRef();

    //Handle submit here
    const handleSubmit = event => {
        event.preventDefault();
        //Create a new aspiration object to submit.
        const editedAspiration = {
            title: titleRef.current.value,
            description: descriptionRef.current.value
        };

        console.log(editedAspiration);

        AspirationService.editAspiration(props.id, editedAspiration).then(data => {
            console.log(data);
            //After editing aspiration, retrieve aspirations again.
            props.retrieveAspirations();
        });
    };

    return (
        <>
            <Modal show={props.editAspirationShow} onHide={props.handleEditAspirationClose}>
                <Modal.Header closeButton className="dim-background">
                    <Modal.Title>
                        <h2 className="font-light squeezed">Edit Aspiration</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <div>
                        <form className="form-group my-3" onSubmit={handleSubmit}>
                            <input className="form-control form-control-lg mb-3" minLength="1" maxLength="50" placeholder="What are you aspiring for?" defaultValue={props.title} ref={titleRef} required/>
                            <input className="form-control form-control-lg mb-3" minLength="1" maxLength="250" placeholder="Description" defaultValue={props.description} ref={descriptionRef} required/>
                            <button className="btn btn-primary btn-lg btn-block mt-3 mb-3" type="submit" onClick={() => {
                                props.handleEditAspirationClose();
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

export default EditAspiration;