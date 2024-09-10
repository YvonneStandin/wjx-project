import React from 'react'
import { RouterProvider } from 'react-router-dom'
import routerConfig from './router'
import './App.css'
import { useTitle } from 'ahooks'

function App() {
  useTitle('夸克奶酪问卷')
  return <RouterProvider router={routerConfig}></RouterProvider>
}

export default App
