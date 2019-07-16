import React from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import axios from 'axios';
const StyledButton = styled(Button)`
  margin-left: 2.5px;
  margin-right: 2.5px;
`;
const PlayBookTableData = props => {
  const deletePlaybook = async id => {
    try {
      await axios.delete('http://localhost:8080/api/delete-playbook/' + id);
      props.deletePlaybook(id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <tbody>
      {props.playbookList.map(playbook => (
        <tr key={playbook.id}>
          <td>{playbook.name}</td>
          <td>{playbook.description}</td>
          <td>{playbook.addBy}</td>
          <td>
            <StyledButton
              color="danger"
              onClick={() => deletePlaybook(playbook.id)}
            >
              Delete
            </StyledButton>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default PlayBookTableData;
