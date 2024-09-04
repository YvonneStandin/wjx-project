import React, { FC, useState } from 'react'
import { produce } from 'immer'
// import './list1.css'
import QuestionCard from './components/QuestionCard'

const List1: FC = () => {
  const [questionList, setQuestionList] = useState([
    { id: 1, title: '问卷小黑', isPublished: false },
    { id: 2, title: '问卷小红', isPublished: true },
    { id: 3, title: '问卷奶酪', isPublished: false },
    { id: 4, title: '问卷夸克', isPublished: false },
  ])

  function addQuestion() {
    const num = questionList.length + 1
    // setQuestionList([...questionList, { id: num, title: `问卷${num}`, isPublished: false }])
    setQuestionList(
      produce(draft => {
        draft.push({ id: num, title: `问卷${num}`, isPublished: false })
      })
    )
  }

  function deleteQuestion(id: number) {
    // const newQuestionsList = questionList.filter(item => item.id !== id)
    // setQuestionList(newQuestionsList)
    setQuestionList(
      produce(draft => {
        draft.splice(
          questionList.findIndex(item => item.id === id),
          1
        )
      })
    )
  }

  function publishQuestion(id: number) {
    // const index = questionList.findIndex(item => item.id === id)
    // const newQuestionsList = [...questionList]
    // newQuestionsList[index].isPublished = true
    // setQuestionList(newQuestionsList)

    // setQuestionList(
    //   questionList.map(item => {
    //     if (item.id === id) {
    //       return { ...item, isPublished: true }
    //     }
    //     return item
    //   })
    // )

    setQuestionList(
      produce(draft => {
        draft[questionList.findIndex(item => item.id === id)].isPublished = true
      })
    )
  }

  return (
    <div>
      <h1>问卷列表页</h1>
      <div>
        {questionList.map(question => {
          const { id, title, isPublished } = question
          return (
            <QuestionCard
              key={id}
              id={id}
              title={title}
              isPublished={isPublished}
              deleteQuestion={deleteQuestion}
              publishQuestion={publishQuestion}
            />
          )
          //   return <QuestionCard key={id} {...question} />
        })}
      </div>
      <button onClick={addQuestion}>新增问卷</button>
    </div>
  )
}

export default List1
