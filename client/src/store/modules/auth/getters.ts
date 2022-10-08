export default {
  user(state: any) {
    return state.user
  },
  isAuthenticated(state: any) {
    return !!state.user
  }
}