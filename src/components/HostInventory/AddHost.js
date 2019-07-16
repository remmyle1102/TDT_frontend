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

const AddHost = props => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [ipAdd, setIpAdd] = useState('');
  const [port, setPort] = useState(1433);
  const [description, setDescription] = useState('');
  const toggleModal = () => {
    setModal(!modal);
  };

  const insertHost = async e => {
    e.preventDefault();
    try {
      const data = { name, ipAdd, port, description };
      await axios.post('http://localhost:8080/api/add-host', data);
      props.addHost(data);
      toggleModal();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Button onClick={() => setModal(!modal)}>Add new Host</Button>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add new Host</ModalHeader>
        <Form onSubmit={insertHost}>
          <ModalBody>
            <FormGroup row>
              <Label for="name" sm={3}>
                Hostname
              </Label>
              <Col sm={6}>
                <Input
                  type="text"
                  name="name"
                  placeholder=""
                  onChange={e => setName(e.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="ipAdd" sm={3}>
                IP Address
              </Label>
              <Col sm={6}>
                <Input
                  type="text"
                  name="ipAdd"
                  placeholder=""
                  onChange={e => setIpAdd(e.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="name" sm={3}>
                Port
              </Label>
              <Col sm={6}>
                <Input
                  type="number"
                  name="name"
                  placeholder="Default is 1433"
                  onChange={e => setPort(parseInt(e.target.value))}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="description" sm={3}>
                Description
              </Label>
              <Col sm={6}>
                <Input
                  type="text"
                  name="description"
                  placeholder=""
                  onChange={e => setDescription(e.target.value)}
                />
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" type="submit">
              Add Host
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default AddHost;
