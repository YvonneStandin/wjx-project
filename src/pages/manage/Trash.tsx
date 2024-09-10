import React, { FC } from 'react'
import { useTitle } from 'ahooks'

const Trash: FC = () => {
  useTitle('夸克奶酪问卷-回收站')
  return <p>Trash</p>
}

export default Trash
