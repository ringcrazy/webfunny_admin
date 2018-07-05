import React from "react"
import Bundle from "./lib/bundle"  // 调用基础库的方法

// 加载模块
import HomeContainer from "Containers/home"
export const Home = props => <Bundle load={HomeContainer} title="数据概览" >
  {Container => <Container {...props} />}
</Bundle>
