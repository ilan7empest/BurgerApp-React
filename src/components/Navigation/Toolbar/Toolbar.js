import React from 'react';
import Logo from "../../Logo/Logo"
import NavItems from "../NavigationItems/NavigationItems"
import Aux from "../../../hoc/Auxiliary"
import Backdrop from "../../UI/Backdrop/Backdrop"
import classes from "./Toolbar.css"

const toolbar = (props) => (
    <Aux>
        <Backdrop isVisible={props.show} close={props.toggle} />
        <header className={"navbar navbar-expand-lg navbar-dark bg-dark sticky-top align-items-baseline " + classes.header}> 
            <a className="navbar-brand mr-0 mr-md-4" href="/">
                <Logo />
            </a>
            <button className="navbar-toggler" type="button" onClick={props.toggle}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <nav className={"navbar-collapse collapse " + (props.show ? "show" : "")}>
                <NavItems active={props.active} />
            </nav>
        </header>
    </Aux>
)

export default toolbar