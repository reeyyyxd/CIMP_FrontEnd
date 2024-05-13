import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { useState } from "react"

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
  const [user, setUser] = useState(null);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login user={user} setUser={setUser}/>,
    },
    {
      path: 'home',
      element: <Home user={user} setUser={setUser} />
    },
    {
      path: 'filter',
      element: <Filter user={user} setUser={setUser} />
    },
    {
      path: 'search',
      element: <Search user={user} setUser={setUser} />
    },
    {
      path: 'viewAll',
      element: <ViewAll />
    },
    {
      path: 'items',
      element: <Item user={user} setUser={setUser} />
    },
    {
      path: 'additems',
      element: <AddItems />
    },
    {
      path: 'logs',
      element: <Logs user={user} setUser={setUser} />
    },
    {
      path: 'request',
      element: <Request user={user} setUser={setUser} />
    },
    {
      path: 'receive',
      element: <Receive user={user} setUser={setUser} />
    }
  ])

  return (
    <RouterProvider router={router}/>
  )

}
