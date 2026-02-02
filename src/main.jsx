import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {

  RouterProvider,
} from "react-router";

import AuthProvider from './context/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import router from './routes/router.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster></Toaster>
    </AuthProvider>

  </StrictMode>,
)
