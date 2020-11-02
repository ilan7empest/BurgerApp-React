import React, { Component, Fragment } from 'react';
import Order from '../../components/Order/Order';
import axiosInstance from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionCreator from '../../store/_actions';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';

class Orders extends Component {
  componentDidMount() {
    this.props.onOrdersInit(this.props.tokenId);
    // axiosInstance
    //   .get('orders.json')
    //   .then((res) => {
    //     const fetchOrders = [];
    //     for (let key in res.data) {
    //       fetchOrders.push({
    //         ...res.data[key],
    //         id: key,
    //       });
    //     }
    //     return fetchOrders;
    //   })
    //   .then((orders) => this.setState({ orders: orders, loading: false }))
    //   //   .then(() => console.log(this.state.orders))
    //   .catch((err) => console.log(err));
  }
  render() {
    let orderList = this.props.loading ? (
      <Spinner />
    ) : (
      this.props.orders.map((order) => (
        <div className='shadow p-3 mt-3' key={order.id}>
          <h5 className='mb-1'>{order.id}</h5>
          <ul className='list-group list-group-horizontal-xl my-3'>
            <Order ingredients={order.ingredients} />
          </ul>
          <div>
            Total Price: <b>${order.price}</b>
          </div>
          <Button
            class='btn btn-danger'
            click={() => this.props.onOrderDelete(order.id)}
            type='button'
          >
            Delete Order
          </Button>
        </div>
      ))
    );

    return <Fragment>{orderList}</Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.getOrdersReducer.orders,
    loading: state.getOrdersReducer.loading,
    tokenId: state.auth.tokenId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrdersInit: (toekn) => dispatch(actionCreator.fetchOrdersInit(toekn)),
    onOrderDelete: (id) => dispatch(actionCreator.deleteOrder(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(Orders, axiosInstance));
