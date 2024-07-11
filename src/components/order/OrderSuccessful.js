import React from 'react';
import { Modal } from 'react-bootstrap';
import { capitalize, getUserName } from '../../utilities/Utils';
import { Link } from 'react-router-dom';

function OrderSuccessful({ callback, show }) {
  const userName = getUserName();
  return (
    <Modal
      size="md"
      centered
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Body>
        <div
          className="d-flex flex-column align-items-center my-2"
          style={{ gap: '10px'}}
        >
          <div className="d-flex justify-content-center">
            <div className='border border-success rounded-circle text-success p-3'>
              <h1>✔</h1>
            </div>
          </div>
          <div><h5>{`${capitalize(userName)},`}</h5></div>
          <h3 className="text-primary">Your Order is Confirmed!</h3>
          <div className="text-center">
            We'll send you a shipping confirmation email
            as soon as you order ships
          </div>
          <Link to="/" className="btn btn-primary" onClick={callback}>
            <b>{'Continue Shopping'.toUpperCase()}</b>
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default OrderSuccessful;
