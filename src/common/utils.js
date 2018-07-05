import HttpUtil from "Config/http-util"
export default class Utils {
  static isFunction(obj) {
    return Object.prototype.toString.call(obj) === "[object Function]"
  }
  static isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]"
  }
  static isObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]"
  }
  static format(fmt, ...args) {
    return fmt.replace(/(\{(\d+)\})/g, function(match, firstCap, index) {
      return args[index] === undefined ? match : args[index]
    })
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
          // _.each(v, (i, val) => {
          //  arr.push(encodeURIComponent((prefix ? (prefix + '.') : '') + prop + '[]') + '=' + encodeURIComponent(val || ''));
          // });

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

  static parseQs() {
    const s = window.location.search
    const index = s.indexOf("?")
    const result = {}
    if (index === -1) return result
    const arr = s.substr(index + 1).split("&")
    arr.forEach(function(item) {
      const equals = item.split("=")
      let key = decodeURIComponent(equals[0])
      const val = decodeURIComponent(equals[1] || "")
      let i = 0
      const splitting = key.split(".")
      const len = splitting.length
      key = splitting[len - 1]
      let temp = result
      if (len > 1) {
        for (; i < len - 1; i++) {
          if (!temp[splitting[i]] || !CommonTool.isObject(temp[splitting[i]])) temp[splitting[i]] = {}
          temp = temp[splitting[i]]
        }
      }
      if (key.substr(-2) !== "[]") {
        temp[key] = val
      } else {
        key = key.substr(0, key.length - 2)
        if (!temp[key]) temp[key] = [val]
        else temp[key].push(val)
      }
    })
    return result
  }

  static turnToPage(url) {
    const prePath = BUILD_ENV === "local" ? "/webfunny" : ""
    return prePath + url
  }
}
