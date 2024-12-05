import React from 'react'
import Home from './Home'
import Nav from './Nav'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.min.js";
const App = () => {
  return (
    <div style={{ backgroundImage: "url('https://images.unsplash.com/photo-1733227337809-6b7d33bfecd3?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",  // Replace with the URL of your image
      backgroundSize: 'cover',  // Makes sure the image covers the entire div
      backgroundPosition: 'center', // Centers the image
      height: '100vh',  // Makes the div fill the entire viewport height
      }}>
      
      <Nav/>
      <hr/>
      <br/>
      <Home/>
    </div>
  )
}

export default App
