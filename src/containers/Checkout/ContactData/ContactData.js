import React, { Component, Fragment } from 'react';
import Button from '../../../components/UI/Button/Button';
import axiosInstance from '../../../axios-orders';
import { Spinner } from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postcode: '',
    },
    loading: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const Order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: this.state.name,
        email: this.state.email,
        address: {
          street: this.state.street,
          postcode: this.state.postcode,
        },
      },
      deliveryMethod: 'Take Away',
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
        className='mt-3 shadow rounded p-5'
        onSubmit={(e) => this.handleSubmit(e)}
      >
        <h3 className='mb-4'>Fill up your details</h3>
        <div className='form-row'>
          <div className='form-group col-md-6'>
            <input
              type='text'
              className='form-control'
              name='name'
              value={this.state.value}
              placeholder='Your Name'
              onChange={(e) => this.handleData(e)}
            />
          </div>
          <div className='form-group col-md-6'>
            <input
              type='email'
              className='form-control'
              name='email'
              value={this.state.value}
              placeholder='Your Email'
              onChange={(e) => this.handleData(e)}
            />
          </div>
        </div>
        <div className='form-row'>
          <div className='form-group col-md-6'>
            <input
              type='text'
              className='form-control'
              name='street'
              value={this.state.value}
              placeholder='Your Street Address'
              onChange={(e) => this.handleData(e)}
            />
          </div>
          <div className='form-group col-md-6'>
            <input
              type='text'
              className='form-control'
              name='postcode'
              value={this.state.value}
              placeholder='Your Postal Code'
              onChange={(e) => this.handleData(e)}
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
