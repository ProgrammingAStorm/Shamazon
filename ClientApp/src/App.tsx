//React imports
import { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

//Util imports
import { UserContext } from "./utils/context";

//Component imports
import Header from "./components/Header";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Footer from "./components/Footer";
import NoMatch from "./components/NoMatch";

function App() {
  const [user, setUser] = useState({test: "niogga"});

  return <UserContext.Provider value={[user, setUser]}>
    <Routes >
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<LogIn />} />

        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  </UserContext.Provider>;
}

function Layout() {
  return <>
    <Header />

    <Outlet />

    <Footer />
  </>;
}

export default App