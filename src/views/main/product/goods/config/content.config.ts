export const contentConfig = {
  propList: [
    { prop: 'name', label: '商品名称', minwidth: '80' },
    { prop: 'oldPrice', label: '原价格', minwidth: '80' },
    { prop: 'newPrice', label: '现价格', minwidth: '100' },
    { prop: 'imgUrl', label: '商品图片', minwidth: '100', slotName: 'image' },
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
  showIndex: false,
  title: '商品列表',
  showSelectColumn: false
}
