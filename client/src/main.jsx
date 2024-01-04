import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import * as bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import BudgetProvider from './context/Context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BudgetProvider>
      <App />
    </BudgetProvider>
  </React.StrictMode>,
)
