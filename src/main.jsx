import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Study from './pages/Study.jsx';
import Home from './pages/Home.jsx';
import Quiz from './pages/Quiz.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/study',
        element: <Study />,
      },
      {
        path: '/country-quiz',
        element: <Quiz type='country' />,
      },
      {
        path: '/capital-quiz',
        element: <Quiz type='capital' />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
