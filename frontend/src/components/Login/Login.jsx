import React, { useState } from 'react';
import {
  Stack, TextField, Button, Typography,
} from '@mui/material';

const textFieldStyles = {
  marginBottom: '16px',
};

const buttonStyles = {
  marginBottom: '16px',
};

function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login or registration logic here based on isLoginMode
    if (isLoginMode) {
      // Handle login
    } else {
      // Handle registration
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
            required
            fullWidth
            sx={textFieldStyles}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
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
