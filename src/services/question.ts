import axios, { ResDataType } from './ajax'

type searchOption = {
  keyword: string
  page: number
  pageSize: number
  isStar: boolean
  isDeleted: boolean
  isPublished: boolean
}

//获取单个问卷信息
export async function getQuestionService(id: string) {
  const url = `/api/question/${id}`
  const data = await axios.get(url)
  return data
}

//创建问卷
export async function createQuestionService(): Promise<ResDataType> {
  const url = '/api/question'
  const data = (await axios.post(url)) as ResDataType
  return data
}

//获取问卷列表
export async function getQuestionListService(
  opt: Partial<searchOption> = {}
): Promise<ResDataType> {
  const url = '/api/question'
  const data = (await axios.get(url, {
    params: opt,
  })) as ResDataType
  return data
}
