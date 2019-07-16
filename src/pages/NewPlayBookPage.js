import React from 'react';
import styled from 'styled-components';
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';

const Container = styled.div`
	margin-top: 50px;
	display: flex;
	justify-content: center;
`;

const NewPlayBookPage = () => {
  return (
    <Row>
      <Col>
        <Container>
          <Col xl={8} lg={12} md={12}>
            <Card>
              <CardBody>
                <Form id="startNewAudit">
                  <FormGroup row>
                    <Label for="hostname" sm={4}>
                      Hostname
                    </Label>
                    <Col sm={6}>
                      <Input
                        type="text"
                        name="hostname"
                        placeholder="your host name"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="ipAddress" sm={4}>
                      IP Address
                    </Label>
                    <Col sm={6}>
                      <Input
                        type="text"
                        name="ipAddress"
                        placeholder="your IP address"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="description" sm={4}>
                      Description
                    </Label>
                    <Col sm={6}>
                      <Input
                        type="text"
                        name="description"
                        placeholder="you description"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleSelect" sm={4}>
                      Audit account assign
                    </Label>
                    <Col sm={6}>
                      <Input type="select" name="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup >
                    <Row>
                      <Col md={4}>
                        <Button block>Start Audit</Button>
                      </Col>
                    </Row>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Container>
      </Col>
    </Row>
  );
};

export default NewPlayBookPage;
