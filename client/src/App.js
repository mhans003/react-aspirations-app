import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
    //Pull out values from context (global state), using the AuthContext.
    return (
        <Router>
            <Header/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
        </Router>
    );
}

export default App;