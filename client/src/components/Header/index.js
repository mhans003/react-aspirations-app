import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../Services/AuthService";
import { AuthContext } from "../../Context/AuthContext";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import NavItem from "../NavItem";

const Header = (props) => {
    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

    //Handle logging the user out.
    const handleLogOut = () => {
        //Using the logout function in AuthService, log the user out.
        AuthService.logout().then(data => {
            //From server, we will now have an empty user, so we want to update the global state.
            if(data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    };

    //Render the navbar links when not logged in.
    const unauthenticatedNabar = () => {
        return (
            <>
                <NavItem text={"HOME"} tagName={""} current={props.current}/>
                <NavItem text={"LOGIN"} tagName={"login"} current={props.current}/>
                <NavItem text={"REGISTER"} tagName={"register"} current={props.current}/>
            </>
        );
    };

    //Render navbar links when logged in.
    const authenticatedNavbar = () => {
        return (
            <>
                <NavItem text={"HOME"} tagName={""} current={props.current}/>
                <NavItem text={"ASPIRATIONS"} tagName={"aspirations"} current={props.current}/>
                {
                    user.role === "admin" ? 
                    <NavItem text={"ADMIN"} tagName={"admin"} current={props.current}/> : null
                }
                <span className="nav-item">
                    <button type="button" className="btn btn-link" onClick={handleLogOut}>
                        LOGOUT
                    </button>
                </span>
            </>
        );
    };

    return (
        <Navbar className="navbar-light bg-light" expand="md">
            <Navbar.Brand href="/">ASPIRATIONS</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    { !isAuthenticated ? unauthenticatedNabar() : authenticatedNavbar() }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;