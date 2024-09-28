import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
import styles from './MainLayout.module.scss'

const { Header, Footer, Content } = Layout

const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo></Logo>
        </div>
        <div className={styles.right}>
          <UserInfo></UserInfo>
        </div>
      </Header>
      <Content className={styles.main}>
        {waitingUserData ? (
          <div className={styles.spin}>
            <Spin size="large"></Spin>
          </div>
        ) : (
          <Outlet></Outlet>
        )}
      </Content>
      <Footer className={styles.footer}>
        夸克奶酪问卷 &copy; 2024 - present. Created by Yvonne
      </Footer>
    </Layout>
  )
}

export default MainLayout
