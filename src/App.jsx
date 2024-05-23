import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import { useState } from "react"

import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Filter from "./Pages/Filter"
import Search from "./Pages/Search"
import ViewAll from "./Pages/ViewAll"
import Item from "./Pages/Items"
import Logs from "./Pages/Logs"
import Request from "./Pages/Request"
import Receive from "./Pages/Receive"
import Dashboard from "./Pages/Dashboard"
import EditProfile from "./Pages/EditProfile"


export default function App() {
  const [user, setUser] = useState(null);

  function RequireAuth({ children }) {
    return user !== null ? (children) : (<Navigate to="/" replace />);
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login user={user} setUser={setUser}/>
    },
    {
      path: 'home',
      element: <RequireAuth> <Home user={user} setUser={setUser} /> </RequireAuth> 
    },
    {
      path: 'filter',
      element: <RequireAuth> <Filter user={user} setUser={setUser} /> </RequireAuth>
    },
    {
      path: 'dashboard',
      element: <RequireAuth> <Dashboard user={user} setUser={setUser} /> </RequireAuth>
    },
    {
      path: 'search',
      element: <RequireAuth> <Search user={user} setUser={setUser} /> </RequireAuth>
    },
    {
      path: 'viewAll',
      element: <ViewAll />
    },
    {
      path: 'items',
      element: <RequireAuth> <Item user={user} setUser={setUser} /> </RequireAuth>
    },
    {
      path: 'logs',
      element: <RequireAuth> <Logs user={user} setUser={setUser} /> </RequireAuth>
    },
    {
      path: 'request',
      element: <RequireAuth> <Request user={user} setUser={setUser} /> </RequireAuth>
    },
    {
      path: 'receive',
      element: <RequireAuth> <Receive user={user} setUser={setUser} /> </RequireAuth>
    },
    {
      path: 'editprofile',
      element: <RequireAuth> <EditProfile user={user} setUser={setUser} /> </RequireAuth>
    }
    
  ])

  return (
    <RouterProvider router={router}/>
  )

}
