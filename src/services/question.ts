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

//修改问卷字段值
export async function updateQuestionDataService(
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateQuestion: { [key: string]: any }
): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await axios.patch(url, updateQuestion)) as ResDataType
  return data
}

//复制问卷
export async function duplicateQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/duplicate/${id}`
  const data = (await axios.post(url)) as ResDataType
  return data
}
