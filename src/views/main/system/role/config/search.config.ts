import { IForm } from '@/base-ui/form'
export const searchFormConfig: IForm = {
  labelWidth: '120px',
  itemLayout: { padding: '10px 0px' },
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名称',
      rules: [],
      placeholder: '请输入角色名称'
    },
    {
      field: 'intro',
      type: 'password',
      label: '权限介绍',
      rules: [],
      placeholder: '请输入权限介绍'
    },
    {
      field: 'time',
      type: 'datepicker',
      label: '时间',
      otherOptions: {
        type: 'daterange',
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间'
      }
    }
  ]
}
