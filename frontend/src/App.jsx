import { useState } from 'react'

import './App.css'
import UserRoutes from './Routes/UserRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <UserRoutes />
   
    </>
  )
}

export default App
