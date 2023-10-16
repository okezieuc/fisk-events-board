import { useState } from "react";


function App() {
  return (
    <>
    <div>
      <button onClick={() => {console.log('click')}}>
      Log In</button>
     <input onChange={(e) => {
      console.log(e.target.value)
     }} type = "text"></input>
     <input type = "password"></input>
    </div>
    </>
    
  );
}



export default App;
