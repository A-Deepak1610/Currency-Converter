import React from 'react'
import Applayout from './applayout/Applayout';
import { BrowserRouter } from "react-router-dom";
 function App() {
  return (
    <div>
      <BrowserRouter>
      <Applayout/>
      </BrowserRouter>
    </div>
  )
}
export default App;
