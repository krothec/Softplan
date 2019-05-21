import React from 'react'
import App from './App.css'
import { BrowserRouter } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import Header from '../components/templates/Header'
import Routes from './Routes'

export default props =>
    <BrowserRouter>
        <div className="app">
            <Header />
            <Routes />
        </div>
    </BrowserRouter>