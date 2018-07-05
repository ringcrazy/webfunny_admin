import { initApp } from "./lib/entry"
import extraRoutes from "./router"
import reducers from "./reducers"

// 直接调用启动
initApp("/webfunny", reducers, extraRoutes)

