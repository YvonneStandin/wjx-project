import React, { FC } from 'react'
import { Tabs } from 'antd'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import ComponentLib from './ComponentLib'
import Layers from './Layers'

const LeftPanel: FC = () => {
  const tabsItems = [
    {
      key: 'componentLib',
      label: '组件库',
      icon: <AppstoreOutlined />,
      children: <ComponentLib />,
    },
    {
      key: 'layers',
      label: '图层',
      icon: <BarsOutlined />,
      children: <Layers />,
    },
  ]

  return <Tabs items={tabsItems} defaultActiveKey="componentLib"></Tabs>
}

export default LeftPanel
