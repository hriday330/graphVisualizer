import React, { useState } from 'react';
import {
  Stack, TextField, Button, Typography,
} from '@mui/material';
import { login, register } from '../../api/authApi';

const textFieldStyles = {
  marginBottom: '16px',
};

const buttonStyles = {
  marginBottom: '16px',
};

function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isLoginMode) {
        const loginResponse = await login(email, password);
        if (loginResponse.success) {
          console.log('login successful');
        } else {
          console.log(loginResponse.message || 'Login failed');
        }
      } else {
        const registerResponse = await register(email, password);
        if (registerResponse.success) {
          console.log('registration successful');
        } else {
          console.log(registerResponse.message || 'Registration failed');
        }
      }
    } catch (error) { // some other error
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Typography variant="h4" gutterBottom>
        {isLoginMode ? 'Login' : 'Register'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} width="300px">
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            fullWidth
            sx={textFieldStyles}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            fullWidth
            sx={textFieldStyles}
          />
          {!isLoginMode && (
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              type="password"
              required
              fullWidth
              sx={textFieldStyles}
            />
          )}
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={buttonStyles}
            style={{ backgroundColor: '#4B5563', color: '#fff' }}
          >
            {isLoginMode ? 'Login' : 'Register'}
          </Button>
        </Stack>
      </form>
      <Typography variant="body1" onClick={() => setIsLoginMode(!isLoginMode)}>
        {isLoginMode ? 'New user? Register here.' : 'Already registered? Login here.'}
      </Typography>
    </div>
  );
}

export default Login;
