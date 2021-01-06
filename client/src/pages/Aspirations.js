import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import AspirationService from "../Services/AspirationService";
import Aspiration from "../components/Aspiration";
import Message from "../components/Message";

const Aspirations = (props) => {
    //Set up state for aspiration and set of all saved aspirations.
    const [aspiration, setAspiration] = useState({title: "", description: ""});
    const [aspirations, setAspirations] = useState([]);
    //Set up message state.
    const [message, setMessage] = useState(null);

    const authContext = useContext(AuthContext);

    //Get the aspirations 
    useEffect(() => {
        retrieveAspirations();
    }, []);

    const retrieveAspirations = () => {
        AspirationService.getAspirations().then(data => {
            //Store the retrieved aspirations.
            setAspirations(data.aspirations);
        });
    };

    //Handle submit of new aspiration.
    const handleSubmit = event => {
        event.preventDefault();

        AspirationService.postAspiration(aspiration).then(data => {
            const { message } = data;

            resetForm();

            //Get all aspirations after posting new one.
            if(!message.msgError) {
                //Aspiration was successfully created.
                AspirationService.getAspirations().then(getData => {
                    setAspirations(getData.aspirations);
                    setMessage(message);
                })
            } else if(message.msgBody === "Unauthorized") {
                setMessage(message);
                //If not authenticated, update global state to reset user.
                authContext.setUser({username: "", role: ""});
                authContext.setIsAuthenticated(false);
            } else {
                //This will be an error message.
                setMessage(message);
            }
        });
    }

    //Handle when the input is changed to set the current aspiration.
    const onChange = event => {
        setAspiration({
            ...aspiration,
            [event.target.name]: event.target.value
        });
        console.log(aspiration);
    }

    //Reset the form when submitted.
    const resetForm = () => {
        setAspiration({title: "", description: ""});
    }

    return (
        <div>
            <div className="aspiration-list">
                {
                    aspirations.map(thisAspiration => {
                        return <Aspiration key={thisAspiration._id} aspiration={thisAspiration} retrieveAspirations={retrieveAspirations}/>
                    })
                }
            </div>
            <hr/>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="title" value={aspiration.title} onChange={onChange} className="form-control" placeholder="New Aspiration"/>
                </div>
                <div className="form-group">
                    <input type="text" name="description" value={aspiration.description} onChange={onChange} className="form-control" placeholder="Description"/>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">
                    Submit
                </button>
            </form>
            {message ? <Message message={message}/> : null}
        </div>
    );
}

export default Aspirations;