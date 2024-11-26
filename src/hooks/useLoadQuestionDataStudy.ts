import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionService } from '../services/question'

function useLoadQuestionData() {
  //跟随调用位置
  const { id = '' } = useParams()

  //不用useRequest需要自行设定loading，data等数据，并在组件加载完成时调用接口执行实现立马触发
  // const [loading, setLoading] = useState(true)
  // const [questionData, setQuestionData] = useState({})

  // useEffect(() => {
  //   async function fn() {
  //     const data = await getQuestionService(id)
  //     setQuestionData(data)
  //     setLoading(false)
  //   }
  //   fn()
  // }, [])

  const { data, error, loading } = useRequest(() => getQuestionService(id))
  return { loading, data, error }
}

export default useLoadQuestionData
