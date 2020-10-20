import React, { Fragment } from 'react';

const input = (props) => {
  let inputEle = null;
  const inputClasses = ['form-control'];
  if (props.elementtype === 'select') {
    inputClasses.splice(0, 1, 'custom-select');
  }
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push('is-invalid');
  }

  switch (props.elementtype) {
    case 'input':
      inputEle = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          onChange={props.change}
          value={props.value}
        />
      );
      break;
    case 'textarea':
      inputEle = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          onChange={props.change}
          value={props.value}
        ></textarea>
      );
      break;
    case 'select':
      inputEle = (
        <select
          className={inputClasses.join(' ')}
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
          className={inputClasses.join(' ')}
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
