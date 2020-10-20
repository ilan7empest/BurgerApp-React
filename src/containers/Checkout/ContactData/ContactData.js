import React, { Component, Fragment } from 'react';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import axiosInstance from '../../../axios-orders';
import { Spinner } from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          className: 'form-control',
          name: 'name',
          id: 'name',
          placeholder: 'Your Name',
        },
        value: '',
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          className: 'form-control',
          name: 'email',
          id: 'email',
          placeholder: 'Your Email',
        },
        value: '',
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          className: 'form-control',
          name: 'street',
          id: 'street',
          placeholder: 'Your Street Address',
        },
        value: '',
      },
      postcode: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          className: 'form-control',
          name: 'postcode',
          id: 'postcode',
          placeholder: 'Your Postal Code',
        },
        value: '',
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
        value: '',
      },
    },
    loading: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    let formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    const Order = {
      ingredients: this.props.ingredients,
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
    updatedOrderForm[el] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
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
                  change={(e) => this.handleData(e, el.id)}
                />
              </div>
            );
          })}
        </div>
        <Button class='btn btn-primary'>Submit</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return <Fragment>{form}</Fragment>;
  }
}

export default ContactData;
