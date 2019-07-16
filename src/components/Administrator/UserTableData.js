import React from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import axios from 'axios';
const StyledButton = styled(Button)`
  margin-left: 2.5px;
  margin-right: 2.5px;
`;
const UserTableData = props => {
  const deleteUser = async id => {
    try {
      await axios.delete('http://localhost:8080/api/remove-user/' + id);
      props.deleteUser(id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <tbody>
      {props.users.map(user => (
        <tr key={user.id}>
          <td>{user.username}</td>
          <td>{user.role}</td>
          <td>{user.status ? 'Active' : 'Disable'}</td>
          <td>
            <StyledButton color="danger" onClick={() => deleteUser(user.id)}>
              Delete
            </StyledButton>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default UserTableData;
