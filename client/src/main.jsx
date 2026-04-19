import { createRoot } from 'react-dom/client';
import { buildingRoutes, routeConfig } from './router/routeConfig.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from './store/createStore.js';
import './index.css';

const router = createBrowserRouter(buildingRoutes(routeConfig));
const store = createStore(router.navigate);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
