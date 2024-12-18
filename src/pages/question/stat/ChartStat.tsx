import React, { FC } from 'react'
import { Typography } from 'antd'
import PieDemo from './PieStat'

const { Title } = Typography

type PropsType = {
  selectedType: string
  selectedId: string
}

const ChartStat: FC<PropsType> = () => {
  //   const { selectedType, selectedId } = props
  return (
    <>
      <Title level={3}>图表统计</Title>
      <div style={{ height: '50%' }}>
        <PieDemo />
      </div>
    </>
  )
}

export default ChartStat
