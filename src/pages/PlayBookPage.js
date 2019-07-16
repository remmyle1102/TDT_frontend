import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Row, Table } from 'reactstrap';
import axios from 'axios';
import Page from 'components/Page';
import UploadPlaybook from 'components/Playbook/UploadPlaybook';
import PlayBookTableData from 'components/Playbook/PlayBookTableData';

function PlayBookPage() {
  const [playbookList, setPlaybookList] = useState([]);

  async function fetchData() {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/fetch-playbook',
      );
      setPlaybookList(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  const addPlaybook = playbook => {
    playbook.id = playbookList.length + 1;
    setPlaybookList([...playbookList, playbook]);
  };

  const deletePlaybook = id => {
    setPlaybookList(playbookList.filter(playbook => playbook.id !== id));
  };

  useEffect(() => {
    fetchData();
  }, [playbookList.length]);

  return (
    <Page>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Added by</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <PlayBookTableData
                  playbookList={playbookList}
                  deletePlaybook={deletePlaybook}
                />
              </Table>
              <Row>
                <Col md="12" sm="12" xs="12">
                  <UploadPlaybook addPlaybook={addPlaybook} />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
}

export default PlayBookPage;
