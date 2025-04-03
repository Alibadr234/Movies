import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './Component/Layout/Layout';
import Home from './Component/Home/Home';

import Tvlist from './Component/Tvlist/Tvlist';
import Dateils from './Component/Dateils/Dateils';
import DetailsTv from './Component/DetailsTv/DetailsTv';
import PersonDetails from './Component/PersonDetails/PersonDetails';
import ActorDetails from './Component/ActorDetails/ActorDetails';
import Movielist from './Component/Tvlist/Tvlist';

export default function App() {
  const routers = createBrowserRouter([
    {path:'',element:<Layout/>,children:[
      {path:'home',element:<Home/>},
      {path:'',element:<Home/>},
      {path:'movie',element:<Movielist/>},
      {path:'series',element:<Tvlist/>},
      {path:'actors',element:<PersonDetails/>},
      {path:"details/:id", element:<Dateils/>}, 
      {path:"detailsTv/:id", element:<DetailsTv/>} ,
      {path:"actor/:id", element:<ActorDetails/>} 
    ]
    }
  ])
  return (
    <>
    <RouterProvider router={routers}></RouterProvider>
    </>
  )
}
