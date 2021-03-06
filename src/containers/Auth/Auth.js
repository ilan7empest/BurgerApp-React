import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import axiosInstance from '../../axios-orders';
import { connect } from 'react-redux';
import * as actionCreator from '../../store/_actions';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { updateObject } from '../../shared/utility';
import { checkValidation } from '../../shared/validation';

class Auth extends Component {
  state = {
    controls: {
      // username: {
      //   elementType: 'input',
      //   elementConfig: {
      //     type: 'text',
      //     name: 'username',
      //     id: 'name',
      //     placeholder: 'Your Name',
      //     label: 'Username:',
      //     required: true,
      //   },
      //   value: '',
      //   validation: {
      //     required: true,
      //     minLength: 3,
      //   },
      //   valid: false,
      //   touched: false,
      // },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          name: 'email',
          id: 'email',
          placeholder: 'Your Email',
          label: 'Email:',
          required: true,
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          name: 'password',
          id: 'password',
          placeholder: 'Your Password',
          label: 'Password:',
          required: true,
        },
        value: '',
        validation: {
          required: true,
          isNumeric: true,
          minLength: 5,
          maxLength: 10,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    isSignup: true,
  };

  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  handleFieldChange = (e, name) => {
    e.preventDefault();
    //1. copy the state controls + each control
    /*const updatedControls = {
      ...this.state.controls,
      [name]: {
        ...this.state.controls[name],
        value: e.target.value,
        valid: this.checkValidation(
          e.target.value,
          this.state.controls[name].validation
        ),
        touched: true,
      },
    };*/

    // const updatedControls = { ...this.state.controls };
    // const updatedcontrolEl = { ...updatedControls[name] };
    //2. get each control value
    // updatedcontrolEl.value = e.target.value;
    //3. check if value valied
    // updatedcontrolEl.valid = this.checkValidation(
    //   updatedcontrolEl.value,
    //   updatedcontrolEl.validation,
    // );

    // updatedcontrolEl.touched = true;
    // updatedControls[name] = updatedcontrolEl;

    const updatedControls = updateObject(this.state.controls, {
      [name]: updateObject(this.state.controls[name], {
        value: e.target.value,
        valid: checkValidation(e.target.value, this.state.controls[name].validation),
        touched: true,
      }),
    });

    let formValid = true;
    //4. check each field if valid
    for (let name in updatedControls) {
      formValid = updatedControls[name].valid && formValid;
    }
    this.setState({
      controls: updatedControls,
      formIsValid: formValid,
    });

    // console.log(updatedControls);
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    //create User form object
    let userDetails = {};
    for (let key in this.state.controls) {
      userDetails[key] = this.state.controls[key].value;
    }
    // console.log(userDetails);
    //post user to db
    this.props.onSubmitForm(userDetails, this.state.isSignup);
  };
  handleAuthModeSwitch = (e) => {
    e.preventDefault();
    this.setState((preState) => {
      return { isSignup: !preState.isSignup };
    });
  };
  render() {
    const formControlArray = [];
    for (let key in this.state.controls) {
      formControlArray.push({
        name: key,
        controlConfig: this.state.controls[key],
      });
    }

    let createFields = formControlArray.map((field) => (
      <div className='form-group' key={field.name}>
        <Input
          elementtype={field.controlConfig.elementType}
          elementConfig={field.controlConfig.elementConfig}
          invalid={!field.controlConfig.valid}
          shouldValidate={field.controlConfig.validation}
          touched={field.controlConfig.touched}
          change={(e) => this.handleFieldChange(e, field.name)}
          value={field.controlConfig.value}
        />
      </div>
    ));
    if (this.props.loading) {
      createFields = <Spinner />;
    }

    let errorMsg = null;

    if (this.props.error) {
      errorMsg = <p className='text-danger'>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.token) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <form
        className='mt-3 shadow rounded p-3 p-md-5 d-inline-flex flex-column'
        onSubmit={(e) => this.handleOnSubmit(e)}>
        {authRedirect}
        {errorMsg}
        {createFields}

        <Button class='btn btn-primary' disabled={!this.state.formIsValid}>
          {this.state.isSignup ? 'Signup' : 'Login'}
        </Button>

        <Button class='btn btn-danger mt-4' click={this.handleAuthModeSwitch}>
          Switch To {this.state.isSignup ? 'Login' : 'Signup'}
        </Button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.tokenId !== null,
    building: state.burgerReducer.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispacthToProps = (dispatch) => {
  return {
    onSubmitForm: (user, isSignup) => dispatch(actionCreator.auth(user, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actionCreator.setAuthRedirectPath('/')),
  };
};

export default connect(mapStateToProps, mapDispacthToProps)(withErrorHandler(Auth, axiosInstance));
