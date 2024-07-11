import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import Header from '../common/Header';
import Product from './Product';
import { capitalize, getCategories } from '../../utilities/Utils';
import {
  setProductsLoading, setProductsLoadingFailure, setProductsData,
} from '../../store/reducers/mainReducer';

function ProductList() {
  const {
    products, totalCartItems, totalOrderValue,
  } = useSelector(state => state);
  const dispatch = useDispatch();
  const categories = getCategories();
  const [selectedCat, setSelectedCat] = useState('');
  const [loadingStatus, setLoadingStatus] = useState('');

  const fetchData = async () => {
    dispatch(setProductsLoading());
    const searchParamsUrl = new URLSearchParams({
      category: selectedCat,
    }).toString();
    await fetch(
      'http://localhost:8082/products?'+searchParamsUrl,
      { method: 'GET' },
    ).then((res) => res.json())
    .then((res) => {
      dispatch(setProductsData({ products: res }));
    }).catch(() => {
      setLoadingStatus("ERROR");
      dispatch(setProductsLoadingFailure());
    });
  };

  useEffect(() => { fetchData(); }, [selectedCat]);

  return ( 
    <div className='h-100 d-flex flex-column'>
      <Header />
      <Col xs={24} className="">
        <Row>
          <Col xs={3} className='border'>
            {
              categories.map((cat) => (
              <button
                className={`btn btn-link text-decoration-none border-bottom d-block w-100 p-4
                  ${selectedCat === cat ? 'selected-category' : ''}
                `}
                onClick={() => setSelectedCat(cat)}
              >
                <h5>{capitalize(cat)}</h5>
              </button>))
            }
          </Col>
          <Col xs={7}>
            <Row style={{gap: '10px'}}>
              {products.map(product => <Product product={product} />)}
            </Row>
            {
              loadingStatus === "ERROR" && (
                <Row className='text-danger justify-content-center p-4'>
                  Oops! Something went Wrong!
                  <div className="d-flex justify-content-center mt-2">
                    <button
                      className='btn btn-outline-primary'
                      onClick={fetchData}
                    >
                      Retry
                    </button>
                  </div>
                </Row>
              )
            }
          </Col>
        </Row>
      </Col>
      {
        totalCartItems !== 0 && (
          <Col
            className='d-flex bg-info p-2 border rounded'
            style={{
              position: 'fixed',
              right: '20px',
              bottom: '10px',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            <div className="">
              <h6>{`₹${totalOrderValue}`}</h6>
              <div>{`${totalCartItems} Items`}</div>
            </div>
            <div>
              <Link
                className="text-decoration-none btn btn-light"
                to="/checkout"
                style={{fontWeight: 'bold'}}
              >
                Checkout
              </Link>
            </div>
          </Col>
        )
      }
    </div>
  );
};

export default ProductList;
