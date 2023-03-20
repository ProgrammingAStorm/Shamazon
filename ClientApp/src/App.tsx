import { Routes, Route, Outlet } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Footer from "./components/Footer";
import NoMatch from "./components/NoMatch";

function App() {
  return <Routes >
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<LogIn />} />

      <Route path="*" element={<NoMatch />} />
    </Route>
  </Routes>;
}

function Layout() {
  return <>
    <Header />

    <Outlet />

    <Footer />
  </>;
}

export default App