import Aspirations from "../../pages/Aspirations";

const Aspiration = (props) => {
    return (
        <div className="card">
            <h5 className="card-header">{props.aspiration.title}</h5>
            <div className="card-body">
                <p className="card-text">{props.aspiration.description}</p>
            </div>
        </div>
    );
}

export default Aspiration;