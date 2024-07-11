import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Login({ show, postLoginCallback, onClose }) {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  async function loginUser() {
    setStatus("PERFORMING_ACTION");
    await fetch(
      'http://localhost:8082/user',
      {
        method: 'POST',
        body: JSON.stringify({
          name: username,
          email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    ).then((res) => res.json())
    .then((res) => {
      localStorage.setItem("name", username);
      localStorage.setItem("email", email);
      localStorage.setItem('userId', res.insertId)
      setStatus("SUCCESS");
      if (postLoginCallback) { postLoginCallback(); }
      onClose();
    }).catch((e) => {
      setStatus("ERROR");
    });
  }

  return (
    <Modal
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                as="input"
                onChange={(e) => { setUserName(e.target.value) }} value={username}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={(e) => { setEmail(e.target.value) }}
                value={email}
              />
            </Form.Group>
          </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={loginUser} disabled={!username || !email || status === 'PERFORMING_ACTION'}>Submit</Button>
        <div className='text-danger' hidden={status !== "ERROR"}>
          Oops! Something went wrong!
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default Login;