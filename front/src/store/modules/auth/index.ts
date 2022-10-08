import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  namespace: true,
  state() {
    return {
      user: null
    }
  },
  mutations,
  actions,
  getters
}