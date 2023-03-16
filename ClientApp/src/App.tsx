import { Routes, Route, Outlet } from "react-router-dom";

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

  return <header>
    <h1>Shamazon</h1>
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