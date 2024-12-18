import React, { FC } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  {
    name: 'Page A',
    uv: 4000,
  },
  {
    name: 'Page B',
    uv: 3000,
  },
  {
    name: 'Page C',
    uv: 2000,
  },
  {
    name: 'Page D',
    uv: 2780,
  },
  {
    name: 'Page E',
    uv: 1890,
  },
  {
    name: 'Page F',
    uv: 2390,
  },
  {
    name: 'Page G',
    uv: 3490,
  },
]

const BarStat: FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 50,
          right: 20,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="uv" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarStat
