import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import FeedPage from './Pages/FeedPage'
import ProfilePage from './Pages/ProfilePage'
import PostDetailsPage from './Pages/PostDetailsPage'
import AuthLayout from './Layouts/AuthLayout'
import Register from './Pages/Register'
import Login from './Pages/Login'
import NotFoundPage from './Pages/NotFoundPage'
import ProtectedRoute from './Layouts/ProtectedRoute'
import AuthProtectedRoute from './Layouts/AuthProtectedRoute '


const router = createBrowserRouter([
  {path:'', element: <MainLayout/>, children: [
    {index:true, element: <ProtectedRoute><FeedPage/></ProtectedRoute>},
    {path:'profile', element: <ProtectedRoute> <ProfilePage/> </ProtectedRoute>},
    {path:'post-details/:id', element: <ProtectedRoute> <PostDetailsPage/> </ProtectedRoute>},
    {path:'*', element: <NotFoundPage/>}
  ]},
  {path:'', element:<AuthLayout/>, children:[
    {path:'register', element: <AuthProtectedRoute> <Register/> </AuthProtectedRoute>},
    {path:'login', element: <AuthProtectedRoute> <Login/> </AuthProtectedRoute>},
  ]}
]) 

export default function App() {
  return <>
  <RouterProvider router={router}/>
  </>
}
