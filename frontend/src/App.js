import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InitialPage from "./components/initialPage";
import ThreeDRoom from "./components/ThreeDRoom";

function MyPortfolio() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/room" element={<ThreeDRoom />} />
      </Routes>
    </Router>
  );
}

export default MyPortfolio;
