import React, { FC } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { Typography } from 'antd'
import { addComponent } from '../../../store/ComponentsReducer'
import { componentConfGroup, ComponentConfType } from '../../../components/QuestionComponents'
import styles from './ComponentLib.module.scss'

const { Title } = Typography

const ComponentLib: FC = () => {
  const dispatch = useDispatch()

  function genComponent(c: ComponentConfType) {
    const { title, type, Component, defaultProps } = c

    function handleClick() {
      dispatch(
        addComponent({
          fe_id: nanoid(), //前端生成的 id，mongodb不认这种格式，所以自定义fe_id
          type,
          title,
          props: defaultProps,
        })
      )
    }

    return (
      <div key={type} className={styles.wrapper} onClick={handleClick}>
        <div className={styles.component}>
          <Component />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.componentLib}>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group

        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
              {groupName}
            </Title>
            {components.map(c => genComponent(c))}
          </div>
        )
      })}
    </div>
  )
}

export default ComponentLib
