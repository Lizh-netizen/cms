export const contentConfig = {
  // prop要跟后端接口的数据属性名保持一致才能获取到数据
  propList: [
    { prop: 'name', label: '用户名', minwidth: '80' },
    { prop: 'realname', label: '真实姓名', minwidth: '80' },
    { prop: 'cellphone', label: '手机号码', minwidth: '100' },
    { prop: 'enable', label: '状态', minwidth: '100', slotName: 'status' },
    {
      prop: 'createAt',
      label: '创建时间',
      minwidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minwidth: '250',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minwidth: '100',
      slotName: 'handler'
    }
  ],
  showIndex: true,
  title: '用户列表',
  showSelectColumn: true
}
