import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import AspirationService from "../../Services/AspirationService";

function DeleteAspiration(props) {
    //Handle submit here
    const handleSubmit = event => {
        event.preventDefault();

        AspirationService.deleteAspiration(props.id).then(data => {
            //After deleting aspiration, retrieve aspirations again.
            props.retrieveAspirations();
        });
    };

    return (
        <>
            <Modal show={props.deleteAspirationShow} onHide={props.handleDeleteAspirationClose}>
                <Modal.Header closeButton className="dim-background">
                    <Modal.Title>
                        <h2 className="font-light squeezed">Confirm Delete</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <div>
                        <form className="form-group my-3" onSubmit={handleSubmit}>
                            <h3 className="font-light squeezed">Are you sure you want to delete this aspiration and all its milestones?</h3>
                            <hr/>
                            <p><strong>{props.title}</strong></p>
                            <p><i>{props.description}</i></p>
                            <button className="btn btn-danger btn-lg btn-block mt-3 mb-3" type="submit" onClick={() => {
                                props.handleDeleteAspirationClose();
                            }}>
                                Delete <i className="fas fa-trash-alt"></i>
                            </button>
                        </form>
                        <hr className="mb-4"/>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DeleteAspiration;