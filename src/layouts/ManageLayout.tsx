import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import sytles from './ManageLayout.module.scss'

const ManageLayout: FC = () => {
  return (
    <div className={sytles.container}>
      <div className={sytles.left}>
        ManageLayout left
        <a href="">创建问卷</a>
        <br />
        <a href="">我的问卷</a>
        <br />
        <a href="">星标问卷</a>
        <br />
        <a href="">回收站</a>
      </div>
      <div className={sytles.right}>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default ManageLayout
