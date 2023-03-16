import { useEffect, useRef } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

function App() {
  return <Routes >
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />

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

function Header() {
  const {
    user,
    isAuthenticated,
    loginWithPopup,
    logout,
  } = useAuth0();

  const mode = useRef('')

  useEffect(() => {
    console.log("From header", user)

    if (isAuthenticated) {
      switch (mode.current) {

      }
    }
  }, [user])

  return <header>
    <h1>Shamazon</h1>

    {!isAuthenticated ? <button onClick={async () => {
      await loginWithPopup({})
    }}>
      Log In
    </button> : <button onClick={() => logout({})}>
      Logout
    </button>}


  </header>;
}

function Home() {
  return <main>
    home
  </main>
}

function Footer() {
  return <footer>Made by mark</footer>;
}

function NoMatch() {
  return <main>
    <h1>No Match!</h1>

    <p>
      Something went wrong and the page you navigated to doesn't exist!
    </p>

    <h4>
      Sorry! {';('}
    </h4>
  </main>
}

export default App

{/* <div>Shamazon</div>
      
      <button onClick={async () => {
        const request = await fetch('/api/test')
        const response = await request.json()

        console.log(response.message)
      }}>
        Press to get list of routes.
      </button>
      
      <button onClick={async () => {
        const request = await fetch('/api/shoppers')
        const response = await request.json()

        console.log(response)
      }}>
        Press to get all shoppers.
      </button> */}