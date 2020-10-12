import React from 'react';
import Backdrop from "../Backdrop/Backdrop"
import Aux from "../../../hoc/Auxiliary"
import classes from "./Modal.css"

const modal = (props) => {
    return (
        <Aux>
            <Backdrop isVisible={props.isVisible} close={props.closeModal} />
            <div
                className={classes.Modal}
                style={{ transform: props.isVisible ? "translateY(0)" : "translateY(-100vh)", opacity: props.isVisible ? "1" : " 0" }}    
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        {props.children}
                    </div>
                </div>
            </div>
        </Aux>
    )
}

export default modal