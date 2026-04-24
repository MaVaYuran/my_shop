const API = `http://localhost:3003/api/v1`;

export const request = async (url, method = 'GET', data, options = {}) => {
  console.log('Request URL:', `${API}${url}`);
  console.log('Request data:', data);
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['authorization'] = `Bearer ${token}`;
  }
  const customHeaders = options.headers || {};

  try {
    const response = await fetch(`${API}${url}`, {
      method,
      headers: { ...headers, ...customHeaders },
      body: data ? JSON.stringify(data) : null,
    });
    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Network request failed');
  }
};
