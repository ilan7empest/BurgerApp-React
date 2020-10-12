import React from 'react';

const backdrop = (props) => (
    props.isVisible ? <div className="modal-backdrop fade show" onClick={props.close}></div> : null
)

export default backdrop