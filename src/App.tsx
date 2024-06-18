import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import './App.css';

function App(){
  return (
    <div className="h-screen">
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    </div>
  )
}

export default App