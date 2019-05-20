import React from 'react'
import App from './App.css'
import { BrowserRouter } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import Footer from '../components/templates/Footer'
import Header from '../components/templates/Header'
import Nav from '../components/templates/Nav'
import Process from '../components/templates/Process'
// import Search from '../components/templates/Search'
import Routes from './Routes'

export default props =>
    <BrowserRouter>
        <div className="app">
            {/* <Process /> */}
            {/* <Search /> */}
            <Header />
            <Routes />
            {/* <Nav /> */}
            {/* <Footer /> */}
        </div>
    </BrowserRouter>