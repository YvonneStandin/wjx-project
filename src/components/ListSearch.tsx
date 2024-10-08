import React, { ChangeEvent, FC, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../constant'
import { Input } from 'antd'

const { Search } = Input

const ListSearch: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [value, setValue] = useState('')

  //获取URL参数，并设置到input value，刷新带有关键字的地址时保证input内同步有值
  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(curVal)
  }, [])

  function handleSearch(value: string) {
    // 不用考虑其他查询字段，不用nav跳转，setSearchParams更方便
    setSearchParams({ [LIST_SEARCH_PARAM_KEY]: value })
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  return (
    <Search
      placeholder="输入关键字 "
      onSearch={handleSearch}
      style={{ width: 200 }}
      value={value}
      onChange={handleChange}
      size="large"
      allowClear
    />
  )
}

export default ListSearch
