import React from 'react';
import Aux from "../../../hoc/Auxiliary"
import Button from "../../UI/Button/Button"

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(key => {
        return (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={key}>
                <span className="text-capitalize">{key}</span>
                <span className="badge badge-primary badge-pill">{props.ingredients[key]}</span>
            </li>
        )
    })
    return (
        <Aux>
            <div className="modal-header">
                <h5 className="modal-title">Order Summary</h5>
                <Button class="close" click={props.closeModal} type="button">
                    <span aria-hidden="true">&times;</span>
                </Button>
            </div>
            <div className="modal-body">
                <ul className="list-group">
                   {ingredientSummary} 
                </ul>
                <h5 className="mt-2">Total Price: ${props.total.toFixed(2)}</h5>
            </div>
            <div className="modal-footer">
                <Button class="btn btn-danger" click={props.closeModal} type="button">
                    Cancel
                </Button>
                <Button type="button" class="btn btn-primary" click={props.continue}>Continue</Button>
            </div>
        </Aux>
    )
}

export default orderSummary