import React, {Component} from 'react';
import Backdrop from "../Backdrop/Backdrop"
import Aux from "../../../hoc/Auxiliary"
import classes from "./Modal.css"

class Modal extends Component {
     shouldComponentUpdate(nextProp, nextStste) {
         return nextProp.isVisible !== this.props.isVisible
    }
    componentDidUpdate() {
        console.log("Modal Update")
    }
    render() {
        return (
        <Aux>
            <Backdrop isVisible={this.props.isVisible} close={this.props.closeModal} />
            <div
                className={classes.Modal}
                style={{ transform: this.props.isVisible ? "translateY(0)" : "translateY(-100vh)", opacity: this.props.isVisible ? "1" : " 0" }}    
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        </Aux>
    )
   }
}

export default Modal