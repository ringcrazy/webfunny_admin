export default class Utils {
  static isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]"
  }
  static isObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]"
  }
  static qs(obj, cache) {
    const arr = []
    function inner(innerObj, prefix) {
      for (const prop in innerObj) {
        if (!innerObj.hasOwnProperty(prop)) return
        const v = innerObj[prop]
        if (!Utils.isArray(v)) {
          if (Utils.isObject(v)) inner(v, prefix ? prefix + "." + prop : prop)
          else arr.push(encodeURIComponent((prefix ? prefix + "." : "") + prop) + "=" + encodeURIComponent(v || ""))
        } else {
          v.forEach((val) => {
            arr.push(encodeURIComponent((prefix ? prefix + "." : "") + prop + "[]") + "=" + encodeURIComponent(val || ""))
          })
        }
      }
    }
    inner(obj, "")
    if (cache && !obj._) {
      arr.push("_=" + encodeURIComponent(BUILD_NO))
    }
    return arr.length ? "?" + arr.join("&") : ""
  }
}
