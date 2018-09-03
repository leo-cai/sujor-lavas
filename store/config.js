export const NETWORK_ERROR = '网络错误，请稍后再试。'
export const NO_MORE_DATA = '没有更多数据啦！'

const IS_DEV = process.env.NODE_ENV !== 'production'

export const API_ROOT = IS_DEV ? 'http://localhost:8000/' : 'https://api.sujor.com/'