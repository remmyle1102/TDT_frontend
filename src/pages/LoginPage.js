import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import axios from 'axios';
import { authenticationService } from 'services/authenticationService';
import { Link } from 'react-router-dom';

function LoginPage(props) {
  const {
    usernameLabel,
    usernameInputProps,
    passwordLabel,
    passwordInputProps,
    history,
  } = props;
  if (authenticationService.currentUser) {
    history.push('/');
  }
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleResponse = response => {
    if ([400, 401, 403].indexOf(response.status) !== -1) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
    }
    localStorage.setItem('currentUser', response.data.accessToken);
    history.push('/');
    return response;
  };

  const authHandler = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', {
        username,
        password,
      });

      handleResponse(response);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Row
      style={{
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Col md={6} lg={4}>
        <Card body>
          <Form>
            <div className="text-center pb-4">
              <h2>Audit Database</h2>
            </div>
            <FormGroup>
              <Label for={usernameLabel}>{usernameLabel}</Label>
              <Input
                {...usernameInputProps}
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for={passwordLabel}>{passwordLabel}</Label>
              <Input
                {...passwordInputProps}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </FormGroup>

            <hr />
            <Button
              onClick={authHandler}
              size="lg"
              tag={Link}
              to={'/'}
              className="bg-gradient-theme-left border-0"
              block
            >
              Login
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

LoginPage.propTypes = {
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

LoginPage.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  usernameLabel: 'Username',
  usernameInputProps: {
    type: 'text',
    placeholder: 'your username',
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    placeholder: 'your password',
  },
};

export default LoginPage;
