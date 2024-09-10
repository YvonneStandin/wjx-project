import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import styles from './MainLayout.module.scss'

const { Header, Footer, Content } = Layout

const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>zuoce</div>
        <div className={styles.right}>youice</div>
      </Header>
      <Content className={styles.main}>
        <Outlet></Outlet>
      </Content>
      <Footer className={styles.footer}>
        夸克奶酪问卷 &copy; 2024 - present. Created by Yvonne
      </Footer>
    </Layout>
  )
}

export default MainLayout
