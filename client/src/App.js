import React from 'react';
import {Route, Router, Routes} from 'react-router-dom';
import Login from "./components/Login";
import Signup from "./components/Signup";
import List from "./components/List";
const App = () => {
  return (
      <div>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/list" exact element={<List />} />
         
        </Routes>
      </div>
  );
};

export default App;
