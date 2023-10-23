import { useState } from "react";
import Navbar from "./NavBar.js"; 
import './signup.css'

function App() {
  return (
    <>
   <div className="body">
    <div>
        <img className="logo" src = "Fisklogo.png"></img>
    </div>
    <div className="loginback">
      <div>
        <h1>Welcome to Fisk Events!</h1>
      </div>
      <div className="loginarea">
     <input placeholder="Username" className = "textbox" onChange={(e) => {
      console.log(e.target.value)
     }} type = "text"></input>
     <input placeholder="Password" className="textbox" onChange={(e) => {
      console.log(e.target.value)
     }} type = "password"></input>
     <button className="button" onClick={() => {console.log('click')}}>
      Sign Up</button>
      </div>
    </div>
    </div>
    
    </>
    
  );
}



export default App;
