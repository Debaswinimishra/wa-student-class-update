import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Page from "../pages/index";
import NotFound from "../pages/Not_found";

const RoutesPage = () => {
  return (
    <Router>
      <Routes>
        <Route path="/:id?" element={<Page />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default RoutesPage;
