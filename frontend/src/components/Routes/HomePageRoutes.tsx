import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

import AddRecruit from "../AddRecruit/AddRecruit";
import Recruits from "../Recruits/Recruits";
const Home = lazy(() => import("../Home/Home"));

const HomePageRoutes = () => {
  return (
    <div className='h-full p-4 overflow-auto'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recruits' element={<Recruits />} />
        <Route path='/addrecruit' element={<AddRecruit />} />
      </Routes>
    </div>
  );
};

export default HomePageRoutes;
