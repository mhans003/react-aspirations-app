import { useState, useContext } from "react";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";

//Import Components
import Container from "../components/Container";
import Message from "../components/Message";

const Login = (props) => {
    //Initialize user state.
    const [user, setUser] = useState({email: "", username: "", password: ""});
    //Initialize message state.
    const [message, setMessage] = useState(null);

    const authContext = useContext(AuthContext);

    //When the input changes, set the username/password to the current value.
    const handleChange = (event) => {
        event.preventDefault();
        setUser(
            {
                ...user, 
                [event.target.name] : event.target.value
            }
        );
        console.log(user);
    }

    //Handle when the form is submitted.
    const handleSubmit = (event) => {
        event.preventDefault();
        //Send user information to log in.
        AuthService.login(user).then(data => {
            //Once returned, pull out the needed data from the response.
            const { isAuthenticated, user, message } = data;
            if(isAuthenticated) {
                //Update global context with user information.
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                //Once authenticated, redirect to aspirations for current user.
                props.history.push("/aspirations");
            } else {
                //Otherise, set an error message.
                setMessage(message);
            }
        });
    };

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <h3 className="text-center my-4">Sign In</h3>
                <hr className="my-4"/>
                <div className="form-group">
                    <input type="text" name="username" onChange={handleChange} className="form-control form-control-lg" placeholder="Username" aria-label="Enter Username"/>
                </div>
                <div className="form-group">
                    <input type="password" name="password" onChange={handleChange} className="form-control form-control-lg" placeholder="Password" aria-label="Enter Password"/>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">
                    Log In
                </button>
            </form>
            {message ? <Message message={message}/> : null}
        </Container>
    );
};

export default Login;