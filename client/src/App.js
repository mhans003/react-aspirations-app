import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Aspirations from "./pages/Aspirations";
import Admin from "./pages/Admin";
import PrivateRoute from "./hocs/PrivateRoute";
import PublicRoute from "./hocs/PublicRoute";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
    //Pull out values from context (global state), using the AuthContext.
    return (
        <Router>
            <Header/>
            <Route exact path="/" component={Home}/>
            <PublicRoute exact path="/login" component={Login}/>
            <PublicRoute exact path="/register" component={Register}/>
            <PrivateRoute exact path="/aspirations" roles={["user", "admin"]} component={Aspirations}/>
            <PrivateRoute exact path="/admin" roles={["admin"]} component={Admin}/>
        </Router>
    );
}

export default App;