//React imports
import { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

//Util imports
//import { ShopperContext, SellerContext } from "./utils/context";

//Component imports
//Shopper imports
import MainLayout from "./layouts/Shopper/MainLayout";
import Home from "./pages/Shopper/Home";
import LogIn from "./pages/Shopper/LogIn";
import Signup from "./pages/Shopper/Signup";
import NoMatch from "./components/NoMatch";

//Seller imports
import SellerLayout from "./layouts/Seller/SellerLayout";
import SellerHome from "./pages/Seller/Home";
import SellerLogin from "./pages/Seller/Login";
import SellerSignup from "./pages/Seller/Signup";

function App() {
  return <Routes >
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />

      <Route path="/login" element={<LogIn />} />

      <Route path="/signup" element={<Signup />} />
    </Route>

    <Route path="/seller" element={<SellerLayout />}>
      <Route index element={<SellerHome />} />

      <Route path="/seller/login" element={<SellerLogin />} />

      <Route path="/seller/signup" element={<SellerSignup />} />
    </Route>

    <Route path="*" element={<NoMatch />} />
  </Routes>;
}

export default App;