if (!String.prototype.format) {
  String.prototype.format = function() {
    const fmt = this
    const params = Array.prototype.slice.call(arguments)
    return fmt.replace(/(\{(\d+)\})/g, function(match, firstCap, index) {
      return params[index] === undefined ? match : params[index]
    })
  }
}
if (!String.prototype.trim) {
  const rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
  String.prototype.trim = function() {
    return this.replace(rtrim, "")
  }
}
if (!Date.prototype.Format) {
  Date.prototype.Format = function(format) { // author: meizz
    let fmt = format
    const o = {
      "M+": this.getMonth() + 1, // 月份
      "d+": this.getDate(), // 日
      "h+": this.getHours(), // 小时
      "m+": this.getMinutes(), // 分
      "s+": this.getSeconds(), // 秒
      "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
      "S": this.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
    for (const k in o) {if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length))}
    return fmt
  }
}
