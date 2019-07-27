import React, { useState, useEffect } from 'react';
import { Button, Table } from 'reactstrap';
import JsonToTable from 'components/JsonToTable'
import axios from 'axios';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  margin-left: 2.5px;
  margin-right: 2.5px;
`;
function Reports(props) {
  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState([]);
  const viewReport = async (location) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/fetch-report-data?location=${location}`)
      setReportData(response.data)
      console.log(response.data)
      setShowReport(!showReport)
    }catch (e) {
      console.log(e)
    }
  }
  const renderTable = (data) =>{
    if (Array.isArray(data) === false ) {
      const dataKey = Object.keys(data)
      return dataKey.map( key => {
        return  <JsonToTable data={data[key]} />
      }
      )
    }
    return <JsonToTable data={data}/>
  }
    return (

        showReport ?
        <div>
        <Button onClick={()=> setShowReport(!showReport)}>Back</Button>
          {reportData.map( (report, index) => {
            return (
              <React.Fragment key={index}>
                <h1>{report.folder}</h1>
                {
                  report.folder === "Task_Instance_DB" ?
                    renderTable(report.dbTaskData)
                    : report.fileData.map( (data) => (
                      renderTable(data.FileData)
                    ))
                }
              </React.Fragment>
            )
          })}
      </div>
          :
        <Table responsive>
          <thead>
          <tr>
            <th>Audit Date</th>
            <th>Task Name</th>
            <th>Problem</th>
            <th>Added by</th>
            <th>Report</th>
          </tr>
          </thead>
          <tbody>
          {props.reportList.map(report => (
            <tr key={report.id}>
              <td>{report.date}</td>
              <td>{report.name}</td>
              <td>{report.problemCount}</td>
              <td>{report.addBy}</td>
              <td>
                <StyledButton color="info" onClick={() => viewReport(report.location)}>
                  View
                </StyledButton>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>

    );
  }
export default Reports;
