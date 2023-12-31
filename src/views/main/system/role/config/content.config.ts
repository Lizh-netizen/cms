export const contentConfig = {
  propList: [
    { prop: 'name', label: '角色名', minwidth: '80' },
    { prop: 'intro', label: '权限介绍', minwidth: '80' },
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
  title: '角色列表',
  showSelectColumn: true
}
