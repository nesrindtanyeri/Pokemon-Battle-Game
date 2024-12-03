import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<h1>Home</h1>} />
    )
  )
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
