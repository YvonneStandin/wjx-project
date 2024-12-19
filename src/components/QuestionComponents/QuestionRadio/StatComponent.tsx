import React, { FC, useMemo } from 'react'
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import type { RadioStatPropsType } from './interface'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

function format(n: number) {
  return (n * 100).toFixed(1)
}

const StatComponent: FC<RadioStatPropsType> = ({ stat: data }) => {
  const sum = useMemo(() => data.reduce((pre, item) => (pre += item.count), 0), [data])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          dataKey="count"
          //   isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={60}
          fill="#8884d8"
          label={i => `${i.name}:${format(i.count / sum)}%`}
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

export default StatComponent
