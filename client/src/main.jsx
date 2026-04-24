import { createRoot } from 'react-dom/client';
import { buildingRoutes, routeConfig } from './router/routeConfig.jsx';
import { createBrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from './store/createStore.js';
import './index.css';
import { restoreSession } from './actions/authActions.js';
import App from './App.jsx';

const router = createBrowserRouter(buildingRoutes(routeConfig));
const store = createStore(router.navigate);
store.dispatch(restoreSession());
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App router={router} />
  </Provider>,
);
