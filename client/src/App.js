import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Aspirations from "./pages/Aspirations";
import Admin from "./pages/Admin";
import PrivateRoute from "./hocs/PrivateRoute";
import PublicRoute from "./hocs/PublicRoute";
import "./pages/style.css"

function App() {
    return (
        <Router>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <PublicRoute path="/register" component={Register}/>
            <PrivateRoute path="/aspirations" roles={["user", "admin"]} component={Aspirations}/>
            <PrivateRoute path="/admin" roles={["admin"]} component={Admin}/>
        </Router>
    );
}

export default App;