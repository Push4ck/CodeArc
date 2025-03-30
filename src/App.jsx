import { Toaster } from "react-hot-toast";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import EditorPage from "./pages/EditorPage";
import TailwindConverter from "./components/TailwindConverter";
import Minifier from "./pages/Minifier";

const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/code-editor" element={<EditorPage />} />
        <Route
          path="/tailwind-to-css-convertor"
          element={<TailwindConverter />}
        />
        <Route path="/code-minifier" element={<Minifier />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
