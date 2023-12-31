import hyRequest from '@/service'
import { IDataType } from '@/service/login/type'

export function getPageListData(url: string, queryInfo: any) {
  return hyRequest.post({
    url: url,
    data: queryInfo
  })
}
// export function getData(url: string) {
//   return hyRequest.get({
//     url: url
//   })
// }
export function deletePageData(url: string) {
  return hyRequest.delete({ url: url })
}
export function createNewdata(url: string, newData: any) {
  return hyRequest.post<IDataType>({ url: url, data: newData })
}
export function editData(url: string, editData: any) {
  return hyRequest.patch<IDataType>({ url: url, data: editData })
}
