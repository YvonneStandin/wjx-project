import React, { FC, useCallback } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { Typography } from 'antd'
import { addComponent } from '../../../store/componentsReducer'
import { componentConfGroup, ComponentConfType } from '../../../components/QuestionComponents'
import styles from './ComponentLib.module.scss'

const { Title } = Typography

function GenComponent(c: ComponentConfType) {
  const { title, type, Component, defaultProps } = c
  const dispatch = useDispatch()

  // 新增组件
  function handleAddComponent() {
    dispatch(
      addComponent({
        fe_id: nanoid(), //前端生成的 id，mongodb不认这种格式，所以自定义fe_id
        type,
        title,
        props: defaultProps,
      })
    )
  }
  // 不依赖任何数据，缓存的住
  const handleClick = useCallback(handleAddComponent, [])

  return (
    <div key={type} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}

const ComponentLib: FC = () => {
  return (
    <div className={styles.componentLib}>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group

        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
              {groupName}
            </Title>
            {components.map(c => GenComponent(c))}
          </div>
        )
      })}
    </div>
  )
}

export default ComponentLib
