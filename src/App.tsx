import React from 'react'
import './App.css'
import { useTitle } from 'ahooks'
import List from './pages/manage/list'

function App() {
  useTitle('夸克奶酪问卷')
  return (
    <>
      <List></List>
    </>
  )
}

export default App
