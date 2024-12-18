import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from 'antd'
import { useRequest } from 'ahooks'
import { getChartListService } from '../../../services/stat'
import PieDemo from './PieStat'
import BarStat from './BarStat'

const { Title } = Typography

type PropsType = {
  selectedType: string
  selectedId: string
}

const ChartStat: FC<PropsType> = props => {
  const { selectedType, selectedId } = props
  const { id: questionId = '' } = useParams()
  const [stat, setStat] = useState([])

  const { run } = useRequest(
    async (questionId: string, selectedId: string) =>
      await getChartListService(questionId, selectedId),
    {
      manual: true,
      onSuccess(res) {
        setStat(res.stat)
      },
    }
  )

  useEffect(() => {
    // 首次渲染无选中，所以判断下
    if (selectedId) run(questionId, selectedId)
  }, [selectedId])

  return (
    <>
      <Title level={3}>图表统计</Title>
      {!selectedId && <div>未选中组件</div>}
      <div style={{ height: '50%' }}>
        {selectedType === 'QuestionRadio' && <PieDemo data={stat} />}
        {selectedType === 'QuestionCheckbox' && <BarStat />}
      </div>
    </>
  )
}

export default ChartStat
