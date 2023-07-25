import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from "@material-tailwind/react";
import { AuthContextProvider } from './context/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>       
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
