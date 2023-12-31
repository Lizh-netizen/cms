import {
  createNewdata,
  editData,
  deletePageData,
  getPageListData
} from '@/service/main/system/system'
import { IRootState } from '@/store/types'
import { Module } from 'vuex'
import { ISystemState } from './types'
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.userList
          case 'role':
            return state.roleList
          case 'goods':
            return state.goodsList
          case 'menu':
            return state.menuList
        }
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.userCount
          case 'role':
            return state.roleCount
          case 'goods':
            return state.goodsCount
          case 'menu':
            return state.menuCount
        }
      }
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    }
  },
  actions: {
    // 1 获取数据
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName
      let pageUrl = ''
      switch (pageName) {
        case 'users':
          pageUrl = '/users/list'
          break
        case 'role':
          pageUrl = '/role/list'
          break
        case 'goods':
          pageUrl = '/goods/list'
          break
        case 'menu':
          pageUrl = '/menu/list'
          break
      }
      // 等待resolved or rejected promise
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      const { list, totalCount } = pageResult.data
      switch (pageName) {
        case 'users':
          commit('changeUserList', list)
          commit('changeUserCount', totalCount)
          break
        case 'role':
          commit('changeRoleList', list)
          commit('changeRoleCount', totalCount)
          break
        case 'goods':
          commit('changeGoodsList', list)
          commit('changeGoodsCount', totalCount)
          break
        case 'menu':
          commit('changeMenuList', list)
          commit('changeMenuCount', totalCount)
          break
      }
    },
    // 2 删除数据
    async deleteDataAction({ dispatch }, payload: any) {
      // 获取pageName和ID,是由后端的接口决定的
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      // 调用删除的网络请求,不用等待结果了
      await deletePageData(pageUrl)
      // 重新请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    // 3 编辑/新增数据
    async createNewdataAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createNewdata(pageUrl, newData)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async editdataAction({ dispatch }, payload: any) {
      const { pageName, editdata, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editData(pageUrl, editdata)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
