import React, { useState, useEffect } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Button,
  Card,
  CardBody,
  Row,
} from 'reactstrap';
import MultiSelect from 'components/MultiSelect';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

function StartNewAudit() {
  const [hostList, setHostList] = useState([]);
  const [playbookList, setPlaybookList] = useState([]);
  const [hostData, setHostData] = useState([]);
  const [playbookData, setPlaybookData] = useState([]);
  const [taskName, setTaskName] = useState('');

  const startNewAudit = async () => {
    try {
      const data = { hostList, playbookList };
      const response = await axios.post(
        'http://localhost:8080/api/start-audit',
        data,
      );
      console.log(response);
    } catch (e) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseHost = await axios.get(
          'http://localhost:8080/api/fetch-host',
        );
        const responsePlaybook = await axios.get(
          'http://localhost:8080/api/fetch-playbook',
        );
        setHostData(responseHost.data);
        setPlaybookData(responsePlaybook.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <Row>
      <Col>
        <Container>
          <Col xl={8} lg={12} md={12}>
            <Card>
              <CardBody>
                <Form id="startNewAudit">
                  <FormGroup row>
                    <Label for="taskName" sm={3}>
                      Task Name
                    </Label>
                    <Col sm={6}>
                      <Input
                        type="text"
                        name="taskName"
                        placeholder="your task name"
                        onChange={e => setTaskName(e.target.value)}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleSelect" sm={3}>
                      Host
                    </Label>
                    <Col sm={6}>
                      <MultiSelect
                        overrideStrings={{
                          selectSomeItems: 'Select your group',
                        }}
                        options={hostData.map(host => {
                          let hostObj = {};
                          hostObj['label'] = `${host.name} (${host.ipAdd}:${
                            host.port
                          })`;
                          hostObj['value'] = `${host.ipAdd}:${host.port}`;
                          return hostObj;
                        })}
                        selected={hostList}
                        onSelectedChanged={selected => setHostList(selected)}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleSelect" sm={3}>
                      Playbook
                    </Label>
                    <Col sm={6}>
                      <MultiSelect
                        overrideStrings={{
                          selectSomeItems: 'Select your playbook',
                        }}
                        options={playbookData.map(playbook => {
                          let playbookObj = {};
                          playbookObj['label'] = playbook.name;
                          playbookObj['value'] = playbook.location;
                          return playbookObj;
                        })}
                        selected={playbookList}
                        onSelectedChanged={selected =>
                          setPlaybookList(selected)
                        }
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <Col md={5}>
                        <Button
                          type="submit"
                          form="startNewAudit"
                          color="primary"
                          block
                        >
                          Download WinRM Cert
                        </Button>
                      </Col>
                      <Col md={5}>
                        <Button block onClick={startNewAudit}>
                          Start Audit
                        </Button>
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
}

export default StartNewAudit;
