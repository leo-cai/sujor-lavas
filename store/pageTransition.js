/**
 * @file pageTransition module
 * @author leo
 */

const state = () => {
  return {
    enable: true,
    type: 'none',
    effect: 'none'
  }
}

const mutations = {
  setType(state, type) {
    state.type = type
  },
  setEffect(state, effect) {
    state.effect = effect
  }
}

export default {
  state,
  mutations
}
