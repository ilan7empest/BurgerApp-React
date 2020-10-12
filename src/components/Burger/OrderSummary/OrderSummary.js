import React from 'react';
import Aux from "../../../hoc/Auxiliary"

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
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <ul className="list-group">
                   {ingredientSummary} 
               </ul>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div>
        </Aux>
    )
}

export default orderSummary