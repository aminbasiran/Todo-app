import React from 'react'
import ReactDOM from 'react-dom/client'
import Temp from './temp.jsx'
import { BrowserRouter } from 'react-router-dom';
import "./main.scss"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <Temp />
    </BrowserRouter>
  </React.StrictMode>,
)
