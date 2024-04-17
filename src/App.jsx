import { RouterProvider, createBrowserRouter } from "react-router-dom"

import RootLayout from "./Layouts/RootLayout"

import Login from "./Pages/Login"
import Home from "./Pages/Home"
import About from "./Pages/About"

export default function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: 'about',
          element: <About />
        }
      ]
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
