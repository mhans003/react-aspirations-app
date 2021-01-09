import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Aspirations from "./pages/Aspirations";
import Admin from "./pages/Admin";
import PrivateRoute from "./hocs/PrivateRoute";
import PublicRoute from "./hocs/PublicRoute";
import HomeRoute from "./hocs/HomeRoute";
import "./pages/style.css"

function App() {
    return (
        <Router>
            <Switch>
                <HomeRoute exact path="/"/>
                <PublicRoute exact path="/login" component={Login}/>
                <PublicRoute exact path="/register" component={Register}/>
                <PrivateRoute exact path="/aspirations" roles={["user", "admin"]} component={Aspirations}/>
                <PrivateRoute exact path="/admin" roles={["admin"]} component={Admin}/>
            </Switch>
        </Router>
    );
}

export default App;