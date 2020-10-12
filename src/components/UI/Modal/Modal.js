import React from 'react';

const Modal = (props) => {
    return (
        <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Modal