export const contentConfig = {
  propList: [
    { prop: 'name', label: '菜单名称', minwidth: '80' },
    { prop: 'type', label: '类型', minwidth: '80' },
    { prop: 'url', label: '菜单url', minwidth: '100' },
    { prop: 'icon', label: 'icon', minwidth: '100', slotName: 'image' },
    {
      prop: 'permission',
      label: '按钮权限',
      minwidth: '100',
      slotName: 'status'
    },
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
  showFooter: false,
  showIndex: false,
  title: '菜单列表',
  showSelectColumn: false,
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  }
}
