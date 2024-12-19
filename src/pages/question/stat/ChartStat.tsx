import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from 'antd'
import { useRequest } from 'ahooks'
import { getChartListService } from '../../../services/stat'
import { getComponentConfByType, StatPropsType } from '../../../components/QuestionComponents'

const { Title } = Typography

type PropsType = {
  selectedType: string
  selectedId: string
}

//根据配置生成组件
//写在FC外侧，不用每次组件更新都创建
function genChartComponent(type: string, data: StatPropsType) {
  const componentConf = getComponentConfByType(type)
  if (!componentConf) return null

  const { StatComponent } = componentConf
  if (!StatComponent) return null

  return <StatComponent {...data} />
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
      <div style={{ height: '50%' }}>{genChartComponent(selectedType, { stat })}</div>
    </>
  )
}

export default ChartStat
