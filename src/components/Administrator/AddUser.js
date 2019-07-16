import React, { useState } from 'react';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import axios from 'axios';

const AddUser = props => {
  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [error, setError] = useState(false);
  const [roleID, setRoleID] = useState(1);
  const toggleModal = () => {
    setModal(!modal);
  };

  const insertUser = async e => {
    e.preventDefault();
    if (confirmedPassword === password) {
      try {
        setError(false);
        const data = { username, password, roleID };
        await axios.post('http://localhost:8080/user/add-user', data);
        props.addUser(data);
        toggleModal();
      } catch (e) {
        console.log(e);
      }
    }
    setError(true);
  };

  return (
    <div>
      <Button onClick={() => setModal(!modal)}>Add new Host</Button>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add new Host</ModalHeader>
        <Form onSubmit={insertUser}>
          <ModalBody>
            <FormGroup row>
              <Label for="Username" sm={4}>
                Username
              </Label>
              <Col sm={6}>
                <Input
                  type="text"
                  name="Username"
                  placeholder="your host name"
                  onChange={e => setUsername(e.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="password" sm={4}>
                Password
              </Label>
              <Col sm={6}>
                <Input
                  type="password"
                  name="password"
                  placeholder="your password"
                  onChange={e => setPassword(e.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="confirmPassword" sm={4}>
                Confirm Password
              </Label>
              <Col sm={6}>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm your password"
                  onChange={e => setConfirmedPassword(e.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleSelect" sm={4}>
                Role
              </Label>
              <Col sm={6}>
                <Input
                  type="select"
                  value={roleID}
                  onChange={e =>
                    setRoleID(
                      e.target.type !== 'number'
                        ? parseInt(e.target.value)
                        : e.target.value,
                    )
                  }
                >
                  <option value={1}>Administrator</option>
                  <option value={2}>User</option>
                </Input>
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" type="submit">
              Add New User
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default AddUser;
