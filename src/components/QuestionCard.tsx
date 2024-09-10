import React, { FC } from 'react'
import styles from './QuestionCard.module.scss'
// import classNames from 'classnames'

type PropsType = {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  createAt: string
  answerCount: number
  deleteQuestion: (id: string) => void
  publishQuestion: (id: string) => void
}

const QuestionCard: FC<PropsType> = props => {
  const { _id, title, isPublished, createAt, answerCount, deleteQuestion } = props

  function edit(id: string) {
    console.log(id)
  }

  function del(id: string) {
    deleteQuestion(id)
  }

  // function pub(id: string) {
  //   publishQuestion(id)
  // }

  // classnames结合条件判断，要有中括号[styles.published]，因为{a:100}属性就是"a"，{[a]:100}属性是a变量名的实际值
  // const itemClassNames = classNames(styles['list-item'], { [styles.published]: isPublished })
  // const itemClassNames = classNames({
  //   [styles['list-item']]: true,
  //   [styles.published]: isPublished,
  // })

  return (
    <div key={_id} className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <a href="#">{title}</a>
        </div>
        <div className={styles.right}>
          {isPublished ? <span style={{ color: 'green' }}>已发布</span> : <span>未发布</span>}
          &nbsp;
          <span>问卷：{answerCount}</span>
          &nbsp;
          <span>{createAt}</span>
        </div>
      </div>
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <button onClick={() => edit(_id)}>编辑问卷</button>
          <button>数据统计 </button>
        </div>
        <div className={styles.right}>
          <button>标星</button>
          <button>复制</button>
          <button onClick={() => del(_id)}>删除</button>
          {/* <button onClick={() => pub(_id)}>发布问卷</button> */}
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
