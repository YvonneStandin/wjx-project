import React, { FC } from 'react'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { Pagination, PaginationProps } from 'antd'
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY, LIST_PAGE_SIZE } from '../constant'

type PropsType = {
  total: number
}

const ListPagination: FC<PropsType> = (props: PropsType) => {
  const { total } = props

  const [searchParams] = useSearchParams()
  const currentPage = Number(searchParams.get(LIST_PAGE_PARAM_KEY)) || 1
  const currentPageSize = Number(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY)) || LIST_PAGE_SIZE

  //page和pageSize改变时
  const nav = useNavigate()
  const { pathname } = useLocation()
  const handleChangePage: PaginationProps['onChange'] = (page, size) => {
    //相比setSearchParams好处在于不用考虑其他原有字段，当下只处理page和size
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, size.toString())
    nav({
      pathname,
      search: searchParams.toString(),
    })
    // setSearchParams({
    //   //搜索字段
    //   [LIST_SEARCH_PARAM_KEY]: searchParams.get(LIST_SEARCH_PARAM_KEY) || '',
    //   //页数字段，当改变条目后页数达不到当前数字时，antd自动调节为最大页数
    //   [LIST_PAGE_PARAM_KEY]: page.toString(),
    //   //显示条目字段
    //   [LIST_PAGE_SIZE_PARAM_KEY]: size.toString() || LIST_PAGE_SIZE.toString(),
    // })
  }
  return (
    <Pagination
      align="center"
      current={currentPage}
      pageSize={currentPageSize}
      onChange={handleChangePage}
      total={total}
    ></Pagination>
  )
}

export default ListPagination
