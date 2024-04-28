export const login = async (email, password) => {
  const response = await fetch('http://localhost:4000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return { status: response.status, ok: response.ok, data };
};

export const register = async (email, password) => {
  const response = await fetch('http://localhost:4000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return { status: response.status, ok: response.ok, data };
};
