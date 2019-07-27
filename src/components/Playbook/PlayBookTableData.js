import React from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import axios from 'axios';
const StyledButton = styled(Button)`
  margin-left: 2.5px;
  margin-right: 2.5px;
`;
const PlayBookTableData = props => {
  const deletePlaybook = async (id,location) => {
    try {
      const data = {id, location}
      await axios.delete(`http://localhost:8080/api/delete-playbook`, {
        data: data
      });
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
          {
           (playbook.id === 2011 || playbook.id === 2017 || playbook.id === 3011) ? null : (

               <StyledButton
                 color="danger"
                 onClick={() => deletePlaybook(playbook.id, playbook.location)}
               >
                 Delete
               </StyledButton>

           )
          }
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default PlayBookTableData;
