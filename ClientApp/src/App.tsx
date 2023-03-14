import { useState } from 'react'

function App() {
  return (
    <div className='flex flex-col'>
      <div>Shamazon</div>
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
      </button>
    </div>
  )
}

export default App