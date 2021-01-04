import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
    //Pull out values from context (global state), using the AuthContext.
    return (
        <Router>
            <Header/>
            <Route exact path="/" component={Home}/>
        </Router>
    );
}

export default App;