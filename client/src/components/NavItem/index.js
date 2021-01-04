import Nav from "react-bootstrap/Nav";

function NavItem(props) {
    return (
        <span className={`nav-item px-3${props.current === props.tagName ? ' active' : ""}`}>
            <Nav.Link href={`/${props.tagName}`}>
                <hr className="hr-light d-lg-none"/>
                <span className="dropdown-text">
                    {props.text}
                </span>
                <hr className="hr-light d-lg-none"/>
            </Nav.Link>
        </span>
    );
}

export default NavItem;