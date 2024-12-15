import React, { FC, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Space, Button, Typography, Input, Tooltip, message } from 'antd'
import { CopyOutlined, QrcodeOutlined, LeftOutlined } from '@ant-design/icons'
import type { InputRef } from 'antd'
import { QRCodeSVG } from 'qrcode.react'
import { EDIT_PATHNAME } from '../../../router'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import styles from './StatHeader.module.scss'

const { Title } = Typography

const StatHeader: FC = () => {
  const nav = useNavigate()
  const { title, isPublished } = useGetPageInfo()
  const { id } = useParams()
  const inputRef = useRef<InputRef>(null)

  function genLinkAndQRcodeElem() {
    if (!isPublished) return null

    //参考 C 端规则
    const url = `http://localhost:3000/question/${id}`

    function handleFocus() {
      inputRef.current?.focus({
        cursor: 'all',
      })
    }

    function handleCopy() {
      if (!inputRef.current) return
      // 选中 input 的值
      inputRef.current.select()
      // 拷贝选中的内容（删除线意味着此接口将被弃用，可能会有新的方案，但目前仅一个接口，网站的拷贝功能都是这个）
      document.execCommand('copy')
      message.success('已拷贝！')
    }

    return (
      <Space>
        <Input value={url} style={{ width: 300 }} onFocus={handleFocus} ref={inputRef}></Input>
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={handleCopy}></Button>
        </Tooltip>
        <Tooltip title={<QRCodeSVG value={url} />}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Tooltip>
      </Space>
    )
  }

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Space>
          <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
            返回
          </Button>
          <Title level={4} style={{ margin: 0 }}>
            {title}
          </Title>
        </Space>
      </div>
      <div className={styles.main}>{genLinkAndQRcodeElem()}</div>
      <div className={styles.right}>
        <Button type="primary" onClick={() => nav(`${EDIT_PATHNAME}/${id}`)}>
          编辑问卷
        </Button>
      </div>
    </div>
  )
}

export default StatHeader
