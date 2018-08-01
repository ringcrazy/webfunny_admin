const envUrls = {
  local: {
    apiServerUrl: "http://www.webfunny.cn",
    nodeApiServerUrl: "http://localhost:9010",
    uri: "http://localhost"
  },
  dev: {
    apiServerUrl: "",
    nodeApiServerUrl: "",
    uri: ""
  },
  qa: {
    apiServerUrl: "https://www.webfunny.cn",
    assetsUrl: "https://www.webfunny.cn",
    nodeApiServerUrl: "https://www.webfunny.cn",
    uri: "https://www.webfunny.cn"
  },
  staging: {
    apiServerUrl: "https://www.webfunny.cn",
    assetsUrl: "https://www.webfunny.cn",
    nodeApiServerUrl: "https://www.webfunny.cn",
    uri: "https://www.webfunny.cn"
  },
  prod: {
    apiServerUrl: "https://www.webfunny.cn",
    assetsUrl: "https://www.webfunny.cn",
    nodeApiServerUrl: "https://www.webfunny.cn",
    uri: "https://www.webfunny.cn"
  }
}

const getApiHost = () => {
  return envUrls[BUILD_ENV].apiServerUrl
}

const getNodeApiHost = () => {
  return envUrls[BUILD_ENV].nodeApiServerUrl
}
//  relativePath   eg: "/ltvfe/cl/"
const getAssetsUrl = (env = BUILD_ENV, relativePath) => {
  const assetsUrl = envUrls[env].assetsUrl || ""
  const suffix = env === "local" ? "/webfunny/" : relativePath
  return assetsUrl + suffix
}

const getUri = () => {
  return envUrls[BUILD_ENV].uri
}

module.exports = {
  getApiHost,
  getNodeApiHost,
  getAssetsUrl,
  getUri
}
