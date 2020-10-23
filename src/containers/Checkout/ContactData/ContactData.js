import React, { Component, Fragment } from 'react';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import axiosInstance from '../../../axios-orders';
import { Spinner } from '../../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          name: 'name',
          id: 'name',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          required: true,
          minLength: 3,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          name: 'email',
          id: 'email',
          placeholder: 'Your Email',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          name: 'street',
          id: 'street',
          placeholder: 'Your Street Address',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      postcode: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          name: 'postcode',
          id: 'postcode',
          placeholder: 'Your Postal Code',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {
              value: 'fastest',
              displayValue: 'Fastest',
            },
            {
              value: 'cheapest',
              displayValue: 'Cheapest',
            },
            {
              value: 'takeaway',
              displayValue: 'Take Away',
            },
          ],
        },
        value: 'fastest',
        validation: {},
        valid: true,
      },
    },
    loading: false,
    formIsValid: false,
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      //Comparison isValid is true if not an empty string. if not empty isValid equals the passed value
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    //return true || false
    return isValid;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    let formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    const Order = {
      ingredients: this.props.ingr,
      price: this.props.price,
      orderData: formData,
    };
    axiosInstance
      .post('/orders.json', Order)
      .then(() => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  handleData = (e, el) => {
    e.preventDefault();
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[el] };
    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation,
    );
    updatedFormElement.touched = true;
    updatedOrderForm[el] = updatedFormElement;

    let formIsValid = true;
    for (let key in updatedOrderForm) {
      formIsValid = updatedOrderForm[key].valid && formIsValid;
    }
    console.log(formIsValid);
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form
        className='mt-3 shadow rounded p-3 p-md-5'
        onSubmit={this.handleSubmit}
      >
        <h3 className='mb-4'>Fill up your details</h3>
        <div className='form-row'>
          {formElementsArray.map((el) => {
            return (
              <div className='form-group col-md-6' key={el.id}>
                <Input
                  elementtype={el.config.elementType}
                  elementConfig={el.config.elementConfig}
                  value={el.config.value}
                  invalid={!el.config.valid}
                  shouldValidate={el.config.validation}
                  touched={el.config.touched}
                  change={(e) => this.handleData(e, el.id)}
                />
              </div>
            );
          })}
        </div>
        <Button class='btn btn-primary' disabled={!this.state.formIsValid}>
          Submit
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return <Fragment>{form}</Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    ingr: state.ingredients,
    price: state.totalPrice,
  };
};

export default connect(mapStateToProps)(ContactData);
