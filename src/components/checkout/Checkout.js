import React, { useState } from 'react';
import Product from '../product/Product';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getHeader, isAuthenticated } from '../../utilities/Utils';
import Login from '../auth/login';
import OrderSuccessful from '../order/OrderSuccessful';
import { updateCartProducts } from '../../store/reducers/mainReducer';
import { Link } from 'react-router-dom';
import Header from '../common/Header';

const BillSectionItem = (header, value) => (
  <div className='d-flex justify-content-between mb-2'>
    <div className="d-inline">{header}</div>
    <div className="d-inline font-weight-bold text-success"><b>{value}</b></div>
  </div>
);

function Checkout() {
  const dispatch = useDispatch();
  const { cartProducts, totalOrderValue } = useSelector((state) => state);
  const [loginModal, toggleLoginModal] = useState(false);
  const [showOrderSuccessModal, toggleOrderSuccessModal] = useState(false);
  const [status, setStatus] = useState('');
  const cartProductsValues = Object.values(cartProducts);

  const checkAuth = async () => {
    // if authenticated directly place the order ow. login then place order
    if (isAuthenticated()) {
      postLoginCallback();
    } else {
      toggleLoginModal(true);
    }
  };

  async function postLoginCallback() {
    setStatus("PERFORMING_ACTION");
    await fetch(
      'http://localhost:8082/place-order',
      {
        method: 'POST',
        body: JSON.stringify({
          cartProducts: cartProductsValues,
        }),
        headers: getHeader(),
      },
    ).then(() => {
      setStatus("SUCCESS");
      toggleOrderSuccessModal(true);
    }).catch(() => {
      setStatus("ERROR");
    });
  };

  function clearCart() {
    dispatch(updateCartProducts({ cartProducts: {} }));
  }

  return (
    <div className="d-flex flex-column">
      {/* Login flow modal */}
      <Login
        show={loginModal}
        postLoginCallback={postLoginCallback}
        onClose={() => toggleLoginModal(false)}
      />

      {/* Order success modal */}
      <OrderSuccessful callback={clearCart} show={showOrderSuccessModal} />

      {/* Header */}
      <Header />

      {/* Rendering cart items */}
      <Row style={{gap: '10px'}} className='mx-0 border-bottom border-dark mt-4'>
        <div className='border-bottom border-dark'>
          <h4>Cart Items</h4>
        </div>
        {cartProductsValues.map(product => (
          <Product
            product={product}
            verticalView
          />
        ))}
      </Row>

      {/* Rendering bill section */}
      <Col
        xs={24}
        className="m-2 py-4 flex"
      >
        <h4>Bill Details</h4>
        {BillSectionItem("Item Total (Incl. taxes)", `₹ ${totalOrderValue}`)}
        {BillSectionItem("Delivery Fee  (₹30 saved)", 'FREE!')}
        <div className="border-bottom border-dark" />
        {BillSectionItem('Total Amount', `₹ ${totalOrderValue}`)}
      </Col>

      <Col xs={24} className="d-flex justify-content-center align-items-center" style={{ gap: '10px' }}>
        <Link className="btn btn-link text-decoration-none text-danger" to="/">Go Back</Link>
        <button className="btn btn-primary text-bold" onClick={checkAuth} disabled={showOrderSuccessModal || status === 'PERFORMING_ACTION'}>Place Order</button>
      </Col>

      {/* Error msg if failure */}
      <Col xs={24} hidden={status !== "ERROR"} className='text-center mt-2'>
        <span className='text-danger'>*Oops! Something went wrong!</span>
      </Col>
    </div>
  );
}

export default Checkout;
