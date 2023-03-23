//React imports
import { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

//Util imports
import { UserContext } from "./utils/context";

//Component imports
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import NoMatch from "./components/NoMatch";
import MainLayout from "./layouts/MainLayout";

function App() {
  const [user, setUser] = useState({token: ''});

  useEffect(() => {
    const token = localStorage.getItem("token")

    if(token != '') {
      setUser({token: token!})
    }
  }, [])

  return <UserContext.Provider value={[user, setUser]}>
    <Routes >
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<LogIn />} />

        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  </UserContext.Provider>;
}

export default App