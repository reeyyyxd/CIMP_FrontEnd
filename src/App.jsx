import { RouterProvider, createBrowserRouter } from "react-router-dom"

import Login from "./Pages/Login"
import Home from "./Pages/Home"

export default function App() {
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: 'login',
      element: <Login />
    }
  ])

  return (
    <RouterProvider router={router}/>
  )

}
