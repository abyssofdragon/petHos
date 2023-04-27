// import { logout } from '@/api/user'
import { login, getUserInfo } from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userName: username.trim(), password: password }).then(response => {
        const { data } = response
        console.log(111, data)
        console.log(data.data.Authorization)
        localStorage.setItem('token', data.data.Authorization)
        localStorage.setItem('role', 'admin')
        commit('SET_TOKEN', data.data.Authorization)
        setToken(data.data.Authorization)
        // commit('SET_NAME', username)
        commit('SET_AVATAR', 'http://erkong.ybc365.com/7ffac20210331212345427.jpeg')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(response => {
        const { data } = response
        console.log(111, response)
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        let roles = []
        if (response.data.data.authority === 1) {
          roles = ['user']
        } else if (response.data.data.authority === 3) {
          roles = ['user', 'admin']
        } else if (response.data.data.authority === 5) {
          roles = ['user', 'admin', 'superadmin']
        }
        commit('SET_NAME', response.data.data.userName)
        commit('SET_ROLES', roles)
        // commit('SET_AUTHORITY', response.data.data.authority)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      commit('SET_ROLES', [])
      resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

