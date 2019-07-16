import React, {useState} from 'react';
import styled from 'styled-components';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios'

const BrowseFileContainer = styled.div`
  padding-top: calc(0.375rem + 1px);
  padding-bottom: calc(0.375rem + 1px);
`

const UploadPlaybook = props => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const toggleModal = () =>{
    setModal(!modal)
  }

  const uploadPlaybook = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('description', description);
    try {
      await axios.post("http://localhost:8080/upload-playbook",  formData);
      props.addPlaybook(formData);
      toggleModal()

    }catch (e) {
      console.log(e)
    }
  };

  return (
    <div>
      <Button color="primary" onClick={()=> setModal(!modal) }>Add new playbook</Button>
      <Modal
        isOpen={modal}
        toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>File Picker</ModalHeader>
        <Form onSubmit={uploadPlaybook}>
          <ModalBody>
            <FormGroup row>
              <Label for="file" sm={3}>
                Playbook
              </Label>
              <Col sm={8}>
                <BrowseFileContainer>
                  <Input type="file" name="file" onChange={e => setFile(e.target.files[0])} />
                </BrowseFileContainer>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="name" sm={3}>
                Save as
              </Label>
              <Col sm={6}>
                <Input
                  type="text"
                  name="name"
                  placeholder="Save playbook name as"
                  onChange={e => setName(e.target.value)}
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
              Upload this playbook
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default UploadPlaybook;
