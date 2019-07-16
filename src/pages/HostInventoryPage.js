import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Row, Table } from 'reactstrap';
import Page from 'components/Page';
import AddHost from 'components/HostInventory/AddHost';
import HostTableData from 'components/HostInventory/HostTableData';
import axios from 'axios';

const HostInventoryPage = () => {
  const [hosts, setHosts] = useState([]);

  const addHost = host => {
    host.id = hosts.length + 1;
    setHosts([...hosts, host]);
  };

  const deleteHost = id => {
    setHosts(hosts.filter(host => host.id !== id));
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/fetch-host',
        );
        setHosts(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  return (
    <Page>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Hostname</th>
                    <th>IP</th>
                    <th>Port</th>
                    <th>Description</th>
                    <th>Added by</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <HostTableData hosts={hosts} deleteHost={deleteHost} />
              </Table>
              <AddHost addHost={addHost} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default HostInventoryPage;
