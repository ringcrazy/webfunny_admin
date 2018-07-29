import React from "react"
import Bundle from "./lib/bundle"  // 调用基础库的方法

// 加载模块
import HomeContainer from "Containers/home"
import ProjectListContainer from "Containers/projectList"


export const Home = props => <Bundle loadContainer={HomeContainer} next={ProjectListContainer} title="数据概览" >
  {Container => <Container {...props} />}
</Bundle>


export const ProjectList = props => <Bundle loadContainer={ProjectListContainer} title="项目列表" >
  {Container => <Container {...props} />}
</Bundle>

import RegisterContainer from "Containers/register"
export const Register = props => <Bundle loadContainer={RegisterContainer} title="register" >
  {Container => <Container {...props} />}
</Bundle>

import LoginContainer from "Containers/login"
export const Login = props => <Bundle loadContainer={LoginContainer} title="login" >
  {Container => <Container {...props} />}
</Bundle>

import JavascriptErrorContainer from "Containers/javascriptError"
export const JavascriptError = props => <Bundle loadContainer={JavascriptErrorContainer} title="JS错误列表" >
  {Container => <Container {...props} />}
</Bundle>
