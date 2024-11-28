import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionService } from '../services/question'
import { useDispatch } from 'react-redux'
import { resetComponents } from '../store/ComponentsReducer'

function useLoadQuestionData() {
  //跟随调用位置url
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  const { data, error, loading, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷 id')
      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true,
    }
  )

  //根据获取的data设置redux store
  useEffect(() => {
    if (!data) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { componentList = [] } = data as any

    //默认选中第一个
    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id
    }
    dispatch(resetComponents({ componentList, selectedId }))
  }, [data])

  //根据id变化，执行ajax
  //但是从逻辑上id是从路由上获取的，id变化即是路由路由变化了，页面刷新自会重新执行ajax，所以应该不用监听id变化
  useEffect(() => {
    run(id)
  }, [id])

  return { loading, error }
}

export default useLoadQuestionData
