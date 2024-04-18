import { RouterProvider, createBrowserRouter } from "react-router-dom"

import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Filter from "./Pages/Filter"

export default function App() {
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: 'login',
      element: <Login />
    },
    {
      path: 'filter',
      element: <Filter />
    }
  ])

  return (
    <RouterProvider router={router}/>
  )

}
