import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Layout from "./pages/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import WriteArticle from "./pages/WriteArticle.jsx";
import BlogTitle from "./pages/BlogTitle.jsx";
import GenerateImage from "./pages/GenerateImage.jsx";
import RemoveBackground from "./pages/RemoveBackground.jsx";
import RemoveObject from "./pages/Removeobject.jsx";
import ReviewResume from "./pages/ReviewResume.jsx";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import {Toaster} from 'react-hot-toast';

const App = () => {
  

  

  return (
    <div>
      <Toaster />
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home />} />

        {/* AI section with layout */}
        <Route path="/ai" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="write-article" element={<WriteArticle />} />
          <Route path="blog-title" element={<BlogTitle />} />
          <Route path="generate-images" element={<GenerateImage />} />
          <Route path="remove-background" element={<RemoveBackground />} />
          <Route path="remove-object" element={<RemoveObject />} />
          <Route path="review-resume" element={<ReviewResume />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
