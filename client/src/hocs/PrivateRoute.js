import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

//This component redirects users to login page if not logged in, or away from admin panel if not admin. Otherwise, renders desired page.
//Destructure component (rename as Component)
//Pull out roles array (roles we want to access this route)
//Then pull out the rest of the parameters (rest array).
const PrivateRoute = ({component: Component, roles, ...rest}) => {
    const { isAuthenticated, user } = useContext(AuthContext);
    return(
        <Route {...rest} render={props => {
            //If user is not authenticated, redirect to the login page (from this location).
            if(!isAuthenticated) {
                return <Redirect to={{ 
                    pathname: "/login", 
                    state: {from: props.location}
                }}/>
            }
            if(!roles.includes(user.role)) {
                return <Redirect to={{ 
                    pathname: "/", 
                    state: {from: props.location}
                }}/>
            }
            return <Component {...props}/>
        }}/>
    )
}

export default PrivateRoute;