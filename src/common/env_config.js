const envUrls = {
  local: {
    apiServerUrl: "http://localhost:3000",
    nodeApiServerUrl: "http://localhost:9010",
    uri: "http://localhost:3000"
  },
  dev: {
    apiServerUrl: "",
    nodeApiServerUrl: "",
    uri: ""
  },
  qa: {
    apiServerUrl: "https://webfunny.cn",
    assetsUrl: "https://webfunny.cn",
    nodeApiServerUrl: "https://webfunny.cn",
    uri: "https://webfunny.cn"
  },
  staging: {
    apiServerUrl: "https://webfunny.cn",
    assetsUrl: "https://webfunny.cn",
    nodeApiServerUrl: "https://webfunny.cn",
    uri: "https://webfunny.cn"
  },
  prod: {
    apiServerUrl: "https://webfunny.cn",
    assetsUrl: "https://webfunny.cn",
    nodeApiServerUrl: "https://webfunny.cn",
    uri: "https://webfunny.cn"
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
  const suffix = env === "local" ? "/" : relativePath
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
