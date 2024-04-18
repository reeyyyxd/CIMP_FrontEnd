import { RouterProvider, createBrowserRouter } from "react-router-dom"

import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Filter from "./Pages/Filter"

export default function App() {
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: 'home',
      element: <Home />
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
