/**
 * 本地服务默认使用代理(指向到qa环境)
 * 如果不使用代理, 只需将本地配置改为非空即可
 * local: {    本地mock 服务
 *   apiServerUrl: "http://localhost:5757",
 *   nodeApiServerUrl: "http://localhost:5757",
 * }
 */
const envUrls = {
  local: {
    apiServerUrl: "https://gw-api-omega-qa.qingchunbank.com"
    , nodeApiServerUrl: "http://localhost:9010"
    , uri: "http://localhost:9010"
  }
  , dev: {
    apiServerUrl: ""
    , nodeApiServerUrl: ""
    , uri: ""
  }
  , qa: {
    apiServerUrl: "https://gw-api-omega-qa.qingchunbank.com"
    , assetsUrl: "https://omega-qa.qingchunbank.com"
    , nodeApiServerUrl: "https://cl-mobile-qa.qingchunbank.com"
    , uri: "https://omega-qa.qingchunbank.com"
  }
  , staging: {
    apiServerUrl: "https://gw-api-omega-staging.qingchunbank.com"
    , assetsUrl: "https://omega-staging.qingchunbank.com"
    , nodeApiServerUrl: "https://cl-mobile-stg.qingchunbank.com"
    , uri: "https://omega-staging.qingchunbank.com"
  }
  , prod: {
    apiServerUrl: "https://gw-api-omega.qingchunbank.com"
    , assetsUrl: "https://omega.qingchunbank.com"
    , nodeApiServerUrl: "https://cl-mobile.qingchunbank.com"
    , uri: "https://omega.qingchunbank.com"
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
  getApiHost
  , getNodeApiHost
  , getAssetsUrl
  , getUri
}
