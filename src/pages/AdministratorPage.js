import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Row, Table } from 'reactstrap';
import Page from 'components/Page';
import AddUser from 'components/Administrator/AddUser';
import UserTableData from 'components/Administrator/UserTableData';
import axios from 'axios';

const AdministratorPage = () => {
  const [users, setUsers] = useState([]);

  const addUser = user => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = id => {
    setUsers(users.filter(user => user.id !== id));
  };
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user/fetch-user');
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [users.length]);

  return (
    <Page>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <UserTableData users={users} deleteUser={deleteUser} />
              </Table>
              <AddUser addUser={addUser} />
              {/*<Button tag={Link} to="/new-user">Add new host</Button>*/}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default AdministratorPage;
