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
          class: 'form-control',
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
          class: 'form-control',
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
          class: 'form-control',
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
          class: 'form-control',
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
    const Order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
    };
    axiosInstance
      .post('/orders.json', Order)
      .then((order) => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  handleData(e) {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === 'street' || name === 'postcode') {
      this.setState({ address: { [name]: value } });
    } else {
      this.setState({ [name]: value });
    }
  }
  render() {
    let form = (
      <form
        className='mt-3 shadow rounded p-3 p-md-5'
        onSubmit={(e) => this.handleSubmit(e)}
      >
        <h3 className='mb-4'>Fill up your details</h3>
        <div className='form-row'>
          <div className='form-group col-md-6'>
            <Input
              elementType=''
              elementConfig=''
              value=''
              change={(e) => this.handleData(e)}
            />
          </div>
          <div className='form-group col-md-6'>
            <Input
              type='email'
              class='form-control'
              name='email'
              id='email'
              value={this.state.value}
              placeholder='Your Email'
              change={(e) => this.handleData(e)}
            />
          </div>
        </div>
        <div className='form-row'>
          <div className='form-group col-md-6'>
            <Input
              type='text'
              class='form-control'
              name='street'
              id='street'
              value={this.state.value}
              placeholder='Your Street Address'
              change={(e) => this.handleData(e)}
            />
          </div>
          <div className='form-group col-md-6'>
            <Input
              type='number'
              class='form-control'
              name='postcode'
              id='postcode'
              value={this.state.value}
              placeholder='Your Postal Code'
              change={(e) => this.handleData(e)}
            />
          </div>
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
