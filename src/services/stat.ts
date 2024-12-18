import axios, { ResDataType } from './ajax'

// 获取统计列表
export async function getStatListService(
  questionId: string,
  opt: { page: number; pageSize: number }
): Promise<ResDataType> {
  const url = `/api/stat/${questionId}`
  const data = (await axios.get(url, { params: opt })) as ResDataType
  return data
}

// 获取图表统计数据
export async function getChartListService(questionId: string, fe_id: string): Promise<ResDataType> {
  const url = `/api/stat/${questionId}/${fe_id}`
  const data = (await axios.get(url)) as ResDataType
  return data
}
