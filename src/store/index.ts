import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState } from './types'
import login from './login/login'
import { IStoreType } from './types'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'
import { getPageListData } from '@/service/main/system/system'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: '12',
      age: 12,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeName(state) {
      state.age = 13
    },
    changeDepartmentList(state, list) {
      state.entireDepartment = list
    },
    changeRoleList(state, list) {
      state.entireRole = list
    },
    changeMenuList(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialData({ commit }) {
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      commit('changeDepartmentList', departmentList)
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      commit('changeRoleList', roleList)
      const menuResult = await getPageListData('/menu/list', {
        offset: 0,
        size: 1000
      })
      const { list: menuList } = menuResult.data
      commit('changeMenuList', menuList)
    }
  },
  modules: { login, system, dashboard }
})
// 对store里的东西做初始化
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}
// 往store中传的就是state的类型
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
