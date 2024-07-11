import React from "react";
import { Row, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { updateCartProducts } from "../../store/reducers/mainReducer";

function Product({ product, verticalView = false }) {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cartProducts);
  const qty = cartProducts?.[product.id]?.qty || 0;

  const addToCart = (nos) => {
    if ((qty+nos) === 0) {
      const temp = { ...cartProducts };
      delete temp[product.id];
      dispatch(updateCartProducts({ cartProducts: temp }));
      return;
    }
    dispatch(updateCartProducts({
      cartProducts: {...cartProducts, [product.id]: {...product, qty: qty + nos}},
    }));
  };

  return (
    <Row
      xs="auto"
      key={product.id}
      className="border border-secondary"
      style={{
        width: verticalView ? '364px' : '136px',
        padding: '8px', margin: '8px',
        flexDirection: verticalView ? 'row' : 'column',
        position: 'relative',
        alignItems: 'center',
      }}
    >
      <Image
        src={product.image}
        height={verticalView ? '100px' : 100}
        width={verticalView? '100px' : 100}
      />
      <div 
        style={{
          padding: '8px',
          display: 'flex',
          flexDirection: verticalView ? 'row' : 'column',
          gap: '8px',
          ...verticalView ? {} : {width: '100%'},
          flexGrow: 1,
        }}
      >
        <div
          style={{
            flexWrap: 'wrap',
            wordBreak: 'break-word',
            flexGrow: 1,
            justifyItems: 'flex-start',
          }}
          className="p-0 text-weight-bold"
        > 
          {product.name}
          <div className="fw-normal">
            M.R.P: ₹{product.price}
          </div>
        </div>
        {
          qty === 0 ? (
            <button
              className="m-0 px-2 btn btn-primary"
              onClick={() => addToCart(1)}
            >
              Add to Cart
            </button>
          ) : (
            <div
              className="border border-primary text-primary" 
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent:'space-between'
              }}
            >
              <button
                className="m-0 px-2 py-1 btn text-primary"
                onClick={() => addToCart(-1)}
              >
                -
              </button>
              {qty}
              <button
                className="m-0 px-2 py-1 btn text-primary"
                onClick={() => addToCart(1)}
              >
                +
              </button>
            </div>
          )
        }
      </div>
    </Row>
  );
}

export default Product;
