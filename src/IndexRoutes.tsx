import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./screens/Home";
import Surah from "./screens/Surah";
export default function IndexRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path=":id" element={<Surah />} />
    </Routes>
  );
}
