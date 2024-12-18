import React, { FC } from 'react'
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

type PropsType = {
  data: { name: string; count: number }[]
}

const PieStat: FC<PropsType> = props => {
  const { data } = props
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          dataKey="count"
          //   isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={70}
          fill="#8884d8"
          label={i => `${i.name}:${i.count}`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieStat
