import { RouterProvider, createBrowserRouter } from "react-router-dom"

import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Filter from "./Pages/Filter"
import Search from "./Pages/Search"
import ViewAll from "./Pages/ViewAll"
import Item from "./Pages/Items"
import AddItems from "./Pages/AddItems"
import Logs from "./Pages/Logs"
import Request from "./Pages/Request"
import Receive from "./Pages/Receive"

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
    },
    {
      path: 'search',
      element: <Search />
    },
    {
      path: 'viewAll',
      element: <ViewAll />
    },
    {
      path: 'items',
      element: <Item />
    },
    {
      path: 'additems',
      element: <AddItems />
    },
    {
      path: 'logs',
      element: <Logs />
    },
    {
      path: 'request',
      element: <Request />
    },
    {
      path: 'receive',
      element: <Receive />
    }
  ])

  return (
    <RouterProvider router={router}/>
  )

}
