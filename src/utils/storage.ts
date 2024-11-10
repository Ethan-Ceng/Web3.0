/**
 * localStorage 模块封装
 */

export default {
  set(key: string, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  get(key: string) {
    const value = localStorage.getItem(key)
    if (!value) return ''

    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  },
  remove(key: string) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  },
}
