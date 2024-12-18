import React, { FC } from 'react'
import { Typography } from 'antd'
import PieDemo from './PieStat'
import BarStat from './BarStat'

const { Title } = Typography

type PropsType = {
  selectedType: string
  selectedId: string
}

const ChartStat: FC<PropsType> = props => {
  const { selectedType } = props
  return (
    <>
      <Title level={3}>图表统计</Title>
      <div style={{ height: '50%' }}>
        {selectedType === 'QuestionRadio' && <PieDemo />}
        {selectedType === 'QuestionCheckbox' && <BarStat />}
      </div>
    </>
  )
}

export default ChartStat
