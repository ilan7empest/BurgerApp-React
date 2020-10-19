import React, { Component, Fragment } from 'react';
import Order from '../../components/Order/Order';
import axiosInstance from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    axiosInstance
      .get('orders.json')
      .then((res) => {
        const fetchOrders = [];
        for (let key in res.data) {
          fetchOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        return fetchOrders;
      })

      .then((orders) => this.setState({ orders: orders, loading: false }))
      //   .then(() => console.log(this.state.orders))
      .catch((err) => console.log(err));
  }
  render() {
    const orderList = this.state.orders.map((order) => {
      return (
        <div className='shadow p-3 mt-3' key={order.id}>
          <h5 className='mb-1'>{order.id}</h5>
          <ul className='list-group list-group-horizontal-xl my-3'>
            <Order ingredients={order.ingredients} />
          </ul>
          <div>
            Total Price: <b>${order.price}</b>
          </div>
        </div>
      );
    });

    return <Fragment>{orderList}</Fragment>;
  }
}

export default withErrorHandler(Orders, axiosInstance);
