import React from "react";
import Home from "../page/Home";
import { Route, Routes } from "react-router-dom";
import Exercise4 from "../page/exercise_4";
import Exercise5 from "../page/exercise-5";

const routes = [
  { path: "/", element: <Home/> },
  { path: "/bai-4", element: <Exercise4 /> },
  { path: "/bai-5", element: <Exercise5 /> },
];

export default function AppRouter() {
  return (
    <Routes>
      {routes.map((route) => {
        return (
          <Route key={route.path} path={route.path} element={route.element} />
        );
      })}
    </Routes>
  );
}
