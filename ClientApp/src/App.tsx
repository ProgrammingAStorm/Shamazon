import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("Press button to get message from server.");

  return (
    <div>Shamazon</div>
  )
}

export default App