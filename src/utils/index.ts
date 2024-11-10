/**
 * 工具函数
 */

export const formatMoney = (num: number | string) => {
  const a = parseFloat(num.toString())
  return a.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })
}


//格式化数字
export const formatNum = (num: number | string) => {
  const a = num.toString()
  if (a.indexOf(',') > -1) return a.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  return a.replace(/(\d)(?=(\d{3})+$)/g, '$1,')

}

//格式化日期
export const toLocalDate = (date?: Date, rule?: string) => {
  let curDate = new Date()
  if (date) curDate = date
  if (rule === 'yyyy-MM-dd') return curDate.toLocaleDateString()
  if (rule === 'HH:mm:sss') return curDate.toLocaleTimeString()
  return curDate.toLocaleString().replaceAll('/', '-')
}

//格式化日期
export const formatDate = (date?: Date, rule?: string) => {
  let curDate = new Date()
  if (date) curDate = date
  let fmt = rule || 'yyyy-MM-dd HH:mm: ss'
  fmt = fmt.replace(/(y+)/, curDate.getFullYear().toString())
  const O = {
    'M+': curDate.getMonth() + 1,
    'd+': curDate.getDate(),
    'h+': curDate.getHours(),
    'm+': curDate.getMinutes(),
    's+': curDate.getSeconds()
  }

  for (const k in O) {
    const val = O[k].toString()
    fmt = fmt.replace(new RegExp(`(${k})`), ('00' + val).substring(val.length))
  }
}

