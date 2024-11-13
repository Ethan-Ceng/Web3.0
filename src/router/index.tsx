import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from '@/views/login/Login.tsx'
import Error404 from '@/views/Error404.tsx'
import NotFound from '@/views/NotFound.tsx'
import Layout from '@/layout'
import Home from '@/views/home'
import Pools from '@/views/pools'


const router = [
  {
    path: '/',
    element: <Navigate to='/index' replace />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/index',
        element: <Home />
      },
      {
        path: '/pools',
        element: <Pools />
      },
    ]
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  },
  {
    path: '/401',
    element: <Error404 />
  },
  {
    path: '/403',
    element: <Error404 />
  },
  {
    path: '/404',
    element: <NotFound />
  },
]

export default createBrowserRouter(router)
