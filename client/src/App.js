
import React from "react";
import { Route, Routes } from 'react-router-dom'
import Home from "./screen/Home";
import Payment from "./screen/Payment";

const App = () => {
  return (
    <>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path='/payment/:id' element={<Payment />} />

      </Routes>

    </>
  );
};

export default App;
