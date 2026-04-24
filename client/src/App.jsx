import React from 'react';
import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router';

const App = ({ router }) => {
  const { loading } = useSelector(state => state.auth);
  if (loading) {
    return <div>Initializing authentication</div>;
  }
  return <RouterProvider router={router} />;
};

export default App;
