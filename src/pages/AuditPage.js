import React, { useState, useEffect } from 'react';
import Page from 'components/Page';
import {
  Card,
  CardBody,
  Col,
  Row,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import classnames from 'classnames';
import Reports from 'components/Audit/Reports';
import StartNewAudit from 'components/Audit/StartNewAudit';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';

function AuditPage() {
  const [activeTab, setActiveTab] = useState('1');
  const [reportList, setReportList] = useState([]);
  const [updateTableData, setUpdateTableData] = useState(0);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/fetch-report',
      );
      setReportList(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, [updateTableData]);

  return (
    <LoadingOverlay
      active={loading}
      spinner
      text={'Executing command, please wait...'}
    >
      <Page>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <div>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === '1',
                        })}
                        onClick={() => {
                          setActiveTab('1');
                        }}
                      >
                        Reports
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === '2',
                        })}
                        onClick={() => {
                          setActiveTab('2');
                        }}
                      >
                        Start New Audit
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Col sm="12">
                          <Reports reportList={reportList} />
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Col sm="12">
                          <StartNewAudit
                            addReport={() =>
                              setUpdateTableData(updateTableData + 1)
                            }
                            setLoading={setLoading}
                            setActiveTab={setActiveTab}
                          />
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    </LoadingOverlay>
  );
}

export default AuditPage;
