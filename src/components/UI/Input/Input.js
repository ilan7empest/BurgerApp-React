import React, { Fragment } from 'react';

const input = (props) => {
  let inputEle = null;
  switch (props.elementType) {
    case 'input':
      inputEle = (
        <input
          {...props.elementConfig}
          onChange={props.change}
          value={props.value}
        />
      );
      break;
    case 'textarea':
      inputEle = (
        <textarea
          {...props}
          onChange={props.change}
          value={props.value}
        ></textarea>
      );
      break;
    default:
      inputEle = (
        <input {...props} onChange={props.change} value={props.value} />
      );
  }

  return (
    <Fragment>
      <label htmlFor={props.name}>{props.placeholder}</label>
      {inputEle}
    </Fragment>
  );
};

export default input;
