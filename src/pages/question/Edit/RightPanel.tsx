import React, { FC } from 'react'
import { Tabs } from 'antd'
import { SettingOutlined, FileTextOutlined } from '@ant-design/icons'
import ComponentProp from './ComponentProp'

const RightPanel: FC = () => {
  const tabsItems = [
    {
      key: 'prop',
      label: '属性',
      icon: <FileTextOutlined />,
      children: <ComponentProp />,
    },
    {
      key: 'layers',
      label: '页面设置',
      icon: <SettingOutlined />,
      children: <div>页面设置</div>,
    },
  ]

  return <Tabs items={tabsItems} defaultActiveKey="prop"></Tabs>
}

export default RightPanel
