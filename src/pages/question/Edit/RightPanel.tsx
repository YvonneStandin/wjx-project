import React, { FC, useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { SettingOutlined, FileTextOutlined } from '@ant-design/icons'
import useGetQuestionComponentsInfo from '../../../hooks/useGetQuestionComponentsInfo'
import ComponentProp from './ComponentProp'
import PageSetting from './PageSetting'

// 枚举
enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
}

const RightPanel: FC = () => {
  const tabsItems = [
    {
      key: TAB_KEYS.PROP_KEY,
      label: '属性',
      icon: <FileTextOutlined />,
      children: <ComponentProp />,
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: '页面设置',
      icon: <SettingOutlined />,
      children: <PageSetting />,
    },
  ]

  const [activeKey, setActiveKey] = useState(TAB_KEYS.SETTING_KEY)
  const { selectedId } = useGetQuestionComponentsInfo()

  useEffect(() => {
    if (selectedId) {
      setActiveKey(TAB_KEYS.PROP_KEY)
    } else {
      setActiveKey(TAB_KEYS.SETTING_KEY)
    }
  }, [selectedId])

  function handelClickTab(key: string) {
    if (key === TAB_KEYS.PROP_KEY) setActiveKey(TAB_KEYS.PROP_KEY)
    else setActiveKey(TAB_KEYS.SETTING_KEY)
  }

  return <Tabs items={tabsItems} activeKey={activeKey} onTabClick={handelClickTab}></Tabs>
}

export default RightPanel
