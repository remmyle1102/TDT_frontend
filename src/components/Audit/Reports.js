import React from 'react';
import { Table, Card, CardBody } from 'reactstrap';
export default class Example extends React.Component {
  render() {
    return (
      <div>
        <Card className="mb-3">
          <CardBody>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Audit Date</th>
                  <th>Task Name</th>
                  <th>Problem</th>
                  <th>Report</th>
                {/* View  */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>1/2/2019</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>1/2/2019</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>1/2/2019</td>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    );
  }
}
