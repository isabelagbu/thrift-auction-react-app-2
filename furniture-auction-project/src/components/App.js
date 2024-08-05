import React from "react";
import {Navigate, Routes, Route} from 'react-router-dom' 

// App components
import Home from "./home-components/Home";
import Header from "./Header";
import About from "./About";
import Create from "./Create";
import Edit from "./Edit";


function App() {
    return (
      <div className="container">
        <Header />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About title="About"/>}/>
          <Route path='/edit/:id' element={<Edit title="Edit Item"/>}/>
          <Route path='/create' element={<Create title="Create New Item"/>}/>
        </Routes>
      </div>
    );
  }
  
  export default App;
