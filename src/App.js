import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowList,{ ShowSummary } from './ShowList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ShowList/>} />
        <Route path="/show/:id" element={<ShowSummary/>} />
      </Routes>
    
     
    
    </Router>
  );
};

export default App;
