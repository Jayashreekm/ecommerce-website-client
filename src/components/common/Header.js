import React from "react";
import { Col } from "react-bootstrap";
import { capitalize, getUserName, isAuthenticated } from "../../utilities/Utils";
import { Link } from "react-router-dom";

function Header() {
  const userName = isAuthenticated() ? getUserName() : '';
  return (
    <Col
      xs={12}
      className='bg-info p-4 d-flex justify-content-between align-items-center'
    >
      <Link to="/" className="text-decoration-none text-black"><h2>Online Shopping</h2></Link>
      <h5>{capitalize(userName)}</h5>
    </Col>
  );
}

export default Header;
