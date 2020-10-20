import React, { Fragment } from 'react';

const input = (props) => {
  let inputEle = null;
  switch (props.elementtype) {
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
          {...props.elementConfig}
          onChange={props.change}
          value={props.value}
        ></textarea>
      );
      break;
    case 'select':
      inputEle = (
        <select
          className='custom-select'
          value={props.value}
          onChange={props.change}
        >
          {props.elementConfig.options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputEle = (
        <input
          {...props.elementConfig}
          onChange={props.change}
          value={props.value}
        />
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
