import React, { Fragment } from 'react';

const input = (props) => {
  let inputEle = null;
  switch (props.inputtype) {
    case 'input':
      inputEle = <input {...props} onChange={props.change} />;
      break;
    case 'textarea':
      inputEle = <textarea {...props} onChange={props.change}></textarea>;
      break;
    default:
      inputEle = <input {...props} onChange={props.change} />;
  }

  return (
    <Fragment>
      <label htmlFor={props.name}>{props.placeholder}</label>
      {inputEle}
    </Fragment>
  );
};

export default input;
