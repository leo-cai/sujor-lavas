/**
 * @file public/common module
 * @author leo
 */

const SET_PAGE_SWITCHING = 'SET_PAGE_SWITCHING'
const SET_PAGE_SCROLL_POSITION = 'SET_PAGE_SCROLL_POSITION'
const SET_SCROLLED_TOP = 'SET_SCROLLED_TOP'
const SET_PAGE_LOADING = 'SET_PAGE_LOADING'
const SET_NOTIFICATION_VISIBLE = 'SET_NOTIFICATION_VISIBLE'
const SET_NOTIFICATION = 'SET_NOTIFICATION'

const state = () => {
  return {
    /**
     * 多个页面是否处于切换中
     *
     * @type {boolean}
     */
    isPageSwitching: false,

    /**
     * 保存页面滚动位置，以 `route.fullPath` 为键
     * {'/': 0, '/detail/1': 100, '/detail/2': 200}
     *
     * @type {Object}
     */
    scrollPostionMap: {},

    /**
     * 页面是否滚动至顶部
     *
     * @type {boolean}
     */
    isScrolledTop: true,
    
    /**
     * 页面是否处于加载中
     * 
     * @type {boolean}
     */
    isPageLoading: false,
    
    /**
     * 是否显示通知
     * 
     * @type {boolean}
     */
    notificationVisible: false,

    /**
     * 通知内容
     * 
     * @type {Object}
     */
    notification: {
      'type': 'info', // 通知类型
      'message': '' // 通知文本
    }
  }
}

const mutations = {
  [SET_PAGE_SWITCHING](state, isPageSwitching) {
    state.isPageSwitching = isPageSwitching
  },
  [SET_PAGE_SCROLL_POSITION](state, {pageId, scrollPosition}) {
    state.scrollPostionMap = {
      ...state.scrollPostionMap,
      [pageId]: scrollPosition
    }
  },
  [SET_SCROLLED_TOP](state, isScrolledTop) {
    state.isScrolledTop = isScrolledTop
  },
  [SET_PAGE_LOADING](state, isPageLoading) {
    state.isPageLoading = isPageLoading
  },
  [SET_NOTIFICATION_VISIBLE](state, notificationVisible) {
    state.notificationVisible = notificationVisible
  },
  [SET_NOTIFICATION](state, notification) {
    state.notificationVisible = true
    state.notification = notification
  }
}

const actions = {
  /**
   * 设置页面是否处于切换中
   *
   * @param {Function} commit commit
   * @param {boolean} isPageSwitching isPageSwitching
   */
  setPageSwitching ({commit}, isPageSwitching) {
    commit(SET_PAGE_SWITCHING, isPageSwitching)
  },
  /**
   * 保存页面滚动位置
   *
   * @param {Function} commit commit
   * @param {Object} payload
   * @param {string} payload.pageId 页面 ID
   * @param {Object} payload.scrollPosition 滚动位置对象 {x:, y:}
   */
  savePageScrollPosition ({commit}, {pageId, scrollPosition}) {
    commit(SET_PAGE_SCROLL_POSITION, {pageId, scrollPosition})
  },
  /**
   * 保存页面滚动至顶部状态
   *
   * @param {Function} commit commit
   * @param {boolean} isScrolledTop
   */
  setScrolledTop ({commit}, isScrolledTop) {
    commit(SET_SCROLLED_TOP, isScrolledTop)
  },
  /**
   * 设置页面是否处于加载中
   *
   * @param {Function} commit commit
   * @param {boolean} isPageLoading isPageLoading
   */
  setPageLoading ({commit}, isPageLoading) {
    commit(SET_PAGE_LOADING, isPageLoading)
  },
  /**
   * 设置通知是否显示
   *
   * @param {Function} commit commit
   * @param {boolean} notificationVisible notificationVisible
   */
  setNotificationVisible ({commit}, notificationVisible) {
    commit(SET_NOTIFICATION_VISIBLE, notificationVisible)
  },
  /**
   * 每次设置新的通知时显示通知
   * 
   * @param {Function} commit commit
   * @param {Object} notification notification
   */
  setNotification ({commit}, notification) {
    commit(SET_NOTIFICATION, notification)
  }
}

export default {
  state,
  mutations,
  actions
}
