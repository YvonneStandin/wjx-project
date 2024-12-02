import React, { FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  UpOutlined,
  DownOutlined,
  ReloadOutlined,
  RedoOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
  deleteComponent,
  changeHidden,
  toggleLocked,
  copyComponent,
  pasteComponent,
} from '../../../store/ComponentsReducer'
import useGetQuestionComponentsInfo from '../../../hooks/useGetQuestionComponentsInfo'

const EditToobar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId, selectedComponent, copiedComponent, componentList } =
    useGetQuestionComponentsInfo()
  const { isLocked } = selectedComponent || {}
  const len = componentList.length

  //删除组件
  function handleDelete() {
    dispatch(deleteComponent())
  }
  //隐藏组件
  function handleHidden() {
    dispatch(changeHidden({ fe_id: selectedId, isHidden: true }))
  }
  //锁定组件
  function handleLock() {
    dispatch(toggleLocked({ fe_id: selectedId }))
  }
  //复制组件
  function handleCopy() {
    dispatch(copyComponent())
  }
  //粘贴
  function handlePaste() {
    dispatch(pasteComponent())
  }

  return (
    <Space>
      <Tooltip placement="bottom" title="删除">
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={handleDelete}
          disabled={len < 1}
        />
      </Tooltip>
      <Tooltip placement="bottom" title="隐藏">
        <Button
          shape="circle"
          icon={<EyeInvisibleOutlined />}
          onClick={handleHidden}
          disabled={len < 1}
        />
      </Tooltip>
      <Tooltip placement="bottom" title={isLocked ? '解锁' : '锁定'}>
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? 'primary' : 'default'}
          disabled={len < 1}
        />
      </Tooltip>
      <Tooltip placement="bottom" title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy} disabled={len < 1} />
      </Tooltip>
      <Tooltip placement="bottom" title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={handlePaste}
          disabled={copiedComponent == null}
        />
      </Tooltip>
      <Tooltip placement="bottom" title="zz">
        <Button shape="circle" icon={<UpOutlined />} />
      </Tooltip>
      <Tooltip placement="bottom" title="zz">
        <Button shape="circle" icon={<DownOutlined />} />
      </Tooltip>
      <Tooltip placement="bottom" title="撤销">
        <Button shape="circle" icon={<ReloadOutlined />} />
      </Tooltip>
      <Tooltip placement="bottom" title="重做">
        <Button shape="circle" icon={<RedoOutlined />} />
      </Tooltip>
    </Space>
  )
}

export default EditToobar
