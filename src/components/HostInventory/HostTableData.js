import React from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import axios from 'axios';
import UpdateHost from 'components/HostInventory/UpdateHost'

const StyledButton = styled(Button)`
  margin-left: 2.5px;
  margin-right: 2.5px;
`;
const HostTableData = (props) => {
  const deleteHost = async (id) => {
    try {
      await axios.delete('http://localhost:8080/api/remove-host/' + id);
      props.deleteHost(id)
    }catch (e) {
      console.log(e)
    }
  }


  return (
    <tbody>
    {props.hosts.map(host => (
      <tr key={host.id}>
        <td>{host.name}</td>
        <td>{host.ipAdd}</td>
        <td>{host.port}</td>
        <td>{host.description }</td>
        <td>{host.addBy }</td>
        <td>
          <StyledButton color="danger" onClick={()=> deleteHost(host.id)}>Delete</StyledButton>
          <UpdateHost/>
        </td>
      </tr>

    ))
    }
    </tbody>

  );
};

export default HostTableData;
