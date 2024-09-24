import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import ManageLayout from '../layouts/ManageLayout'
import QuestionLayout from '../layouts/QuestionLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import MyList from '../pages/manage/list'
import Star from '../pages/manage/Star'
import Trash from '../pages/manage/Trash'
import Edit from '../pages/question/Edit'
import Stat from '../pages/question/stat'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: 'login',
        element: <Login></Login>,
      },
      {
        path: 'register',
        element: <Register></Register>,
      },
      {
        path: 'manage',
        element: <ManageLayout></ManageLayout>,
        children: [
          {
            path: 'list',
            element: <MyList></MyList>,
          },
          {
            path: 'star',
            element: <Star></Star>,
          },
          {
            path: 'trash',
            element: <Trash></Trash>,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound></NotFound>,
      },
    ],
  },
  {
    path: 'question',
    element: <QuestionLayout></QuestionLayout>,
    children: [
      {
        path: 'edit/:id',
        element: <Edit></Edit>,
      },
      {
        path: 'stat/:id',
        element: <Stat></Stat>,
      },
    ],
  },
])

export default router

export const HOME_PATHNAME = '/'
export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'
export const LIST_PATHNAME = '/manage/list'
export const STAR_PATHNAME = '/manage/star'
export const TRASH_PATHNAME = '/manage/trash'
export const EDIT_PATHNAME = '/question/edit/'
export const STAT_PATHNAME = '/question/stat/'
