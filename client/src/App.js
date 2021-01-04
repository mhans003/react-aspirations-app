import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

function App() {
    //Pull out values from context (global state), using the AuthContext.
    const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    console.log(user);
    console.log(isAuthenticated);
    return (
        <div>Placeholder</div>
    );
}

export default App;