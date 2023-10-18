import { useState } from "react";
import Navbar from "./NavBar.js"; 

function App() {
  return (
    <>
    <div>
        <img src = "Fisklogo.png"></img>
    </div>
    <div>
     <input onChange={(e) => {
      console.log(e.target.value)
     }} type = "text"></input>
     <input type = "password"></input>
     <button onClick={() => {console.log('click')}}>
      Log In</button>
    </div>
    </>
    
  );
}



export default App;
