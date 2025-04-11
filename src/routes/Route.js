import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Page1 from "../pages/index";
import Page3 from "../pages/Page3";
import NotFound from "../pages/Not_found";

const RoutesPage = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/page3" element={<Page3 />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default RoutesPage;
