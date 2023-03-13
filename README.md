## Roadmap

### 网络协议系列1
- 硬件: 输入、输出、控制器(CU)、运算器(ALU)、存储器(MU)
- 软件：操作系统、软件
- 网络：ISO七层、TCP/IP五层，两台计算机通信，发送的都是1011011之类的二进制，如果双方没有共同遵守的协定，是没办法通信的。
- 物理层：光缆、电缆、电磁波、集线器
- 链路层：交换机、MAC地址:Media Access Control Address，也称为物理地址，用于表示网络中一台设备的唯一身份(ID)，即类似于身份证ID，每台设备都有唯一编号。 48位二进制，通常换算为12位十六进制表示，可通过`ipconfig /all`查看MAC地址
- 网络层：IP地址：32位二进制、通常换算为4组10进制表示，每一组表示的范围为0~255。例如: 10.10.30.202。
- 传输层：端口
- 应用层：数据格式、video/image/text/audio。
- 常见协议：TCP(可靠传输、经历三次握手四次挥手)、UDP(快速传输、应用于游戏等低延迟领域)、HTTP(万维网协议，超文本传输协议)
- 网络是如何通信的：继电器、交换机、路由器

## CSS系列
选择符
- style important
- id
- class property pesudo class
- tag name pesudo element
- parent child son sibling

组合符
- space > + ~ ||,

指令
- @import
- @charset
- @font-face
- @keyframes

函数
- var()
- url()

盒子模型
- box-sizing: content-box/border-box
- width/height
- padding/margin
- border border-radius
- shadow
- outline
- background: img color position/size repeat attachment origin clip;

布局
- block inline inline-block
- table column
- flex grid
- float static relative absolute fiexed sticky

排版
> mdn font: https://developer.mozilla.org/en-US/docs/Web/CSS/font
- color font-size line-height font-weight font-family font-style font-variant
- white-space letter-spacing word-spacing word-wrap
- decorator transform

动画
- transition: property duration function delay
- transform rotate screw translate scale
- animation: name duration function delay counter

### Sass系列
- 变量 $var:
- 嵌套

### Javascript系列
历史
> javascript20年 javascript ecmascript java之间的关系
- 1995 诞生
- 1996 改名
- 1997 v1
- 1998 v2
- 1999 v3
- 2009 v5
- 2016 v6
- 2017 ...

字符集 编码

变量
> 阮一峰 ES6
- 声明变量：const let var 字面量，构造函数
- 基本类型：string(padStart、padEnd、字符串模板'' "" ``)、number(0.1+02!=0.3)、boolean(值为false的6种情况："" 0 NaN false undefined null)、undefined(NaN)、null(0)、symbol(Symbol.iterator)、bigint
- 引用类型：array、function、object、class
- 基本类型之间的转换：Number()、String()
- 引用类型向基本类型的转换：toprimitive、字符串tostring/valueof、数值valueof/tostring
- 基本类型也可以包装为引用类型：new Number("123")

注释
- 单行注释 //
- 多行注释 /* */
- JSDOC注释 /** */

操作符
> 参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#table
- 最高优先级()
- 最低优先级,

结构
- 循环
- 条件

对象
- 函数：普通函数、箭头函数、callee、caller、arguments、this(四个指向)、new(new xx和new xx()优先级不一样)、高阶函数、curry、闭包(一个返回函数的函数，返回的函数引用有父函数的变量)、垃圾回收、函数调用栈
- 数组：filter、map、reduce、find、findIndex、some、every。。。
- 对象：实例instance、原型prototype、构造函数constructor、继承、原型链、纯对象、实例对象

正则
> 正则小册
- (?!:, ?=, ?!)[\w\W, \d\D, \s\S, ^a-z, ]{n,m/?(0次或1次) *(0+次) +(1+次)}
- 构造参数：new RegExp("", "gm") 字面量：/ddd/gm
- "string".match() "string".matchAll() "".replace()

日期
- 地球有360经度，划分为24个时区，每个时区15度。其中，以英国格林尼治所在地为0时区，往东为东时区，北京在东8区；往西为西市区，纽约为西5区。
- GMT：格林尼治时间，xxx
- IOS：
- 时间分类：年(闰年/平年，十年(decade)，百年(sentr)，千年(mi)) 季(春夏秋冬) 月(一到十二月) 周(1年52周) 天 时 分 秒
- dayjs

JSON
> Javascript
- JSON.strinify
- JSON.parse

错误
- Error

异步
- 同步 异步 微任务/宏任务
- settimeout/setintercal
- generator
- promise
- async/await

迭代
- for
- for of
- for in
- forEach

代理
- getter/setter
- defineProperty 数据描述符/访问描述符
- proxy/relect

二进制
- canvas
- image
- imageData
- blob 适用于文件
- arraybuffer 适用于内存

模块
import

## Typescript系列

## NodeJS系列
- fs fs-extra fs-jetpack
- path resolve join extname
- http create listen
- os
- url

NodeJS版本管理
- nvm

Npm包管理器
- npm
- yarn
- pnpm

进程
- process
- child_process exec spawm

package.json
- 路径查询算法
- package.json
- 作者相关: author
- 导出相关: main module exports bin files

### 工程化
## Shell
- ls
- cd

## NodeJS
- fs
- path
- http

## Lib
- commander
- inquirer
- ora
- chalk
- download-git-repo

## Release
- release-it
- changesets

## Lint
- eslint
- stylelint
- prettier
- husky/git-simple-hooks
- lint-staged
- commitlint
- commitizen

## Monorepo
- pnpm workspace
- turbo

## Code
- babel/swc: 支持typescript、MJS/CJS、流程：Parse、Transform、Generate
- rollup/esbuild：resolveId、load、transform
- vite/webpack：内置功能：项目内使用ESM语法，可加载CJS包，支持Typescript、支持JSON、支持多媒体，默认入口文件为`<root>/index.html`。

## Git
- git init/clone
- git add/commit
- git pull/push
- git hooks: pre-commit post-commit commit-msg
- git stash push/pop
- git flow start/finish

## Chrome系列
基本使用
- 切换TAB页 control 1~9
- 搜索 control + e 聚焦搜索栏 ctrl+l
- 收藏 ctrl+d
- 打开历史记录：ctrl+h
- 打开下载记录：ctrl+j
- 打开开发者工具：ctrl+shift+i/f12
- 页内导航: home页头 end页尾 pageup向上翻页 pagedown向下翻页 up向上滚动 down向下滚动
- 页内搜索：ctrl+f
- 页内刷新：ctrl+r 强制刷新 ctrl+shift+r
- 页内选择：双击 选中单词 三击 选中行
- 页内复制：ctrl+c

开发者工具
- element面板 h隐藏元素
- console面板 css样式，以表格输出 执行时间
- source面板 调试
- Network面板 DOMContentLoaded Load http缓存 浏览器缓存 open in new tab
- 命令面板：ctrl+shift+p

浏览器插件
- vue devtool
- react devtool
- fehelper
- tampermonkey
- automa
- stylus
- console importer

浏览器插件开发
- sse-webextension

其它
- 自定义域名访问本地项目 hosts
- 自定义https证书开发本地项目 cert

## Vscode系列

### 基本使用

快捷键 光标
- 多个光标：alt+鼠标左键 ctrl+alt+up向上插入光标
- ctrl+shift+i 在所有选中行的末尾插入光标
- home/end: 行首/行尾

快捷键 多选
- ctrl+shift+left/right
- ctrl+d 选中光标所在的单词或选中的内容 再次ctrl+d选中下一个相同的内容
- ctrl+l 选中当前行
- ctrl+shift+l 选中所有相同的内容
- ctrl+a 全选

快捷键 粘贴
- shift+alt+up/down 向上/向下复制当前行
- enter 在光标处插入新行
- ctrl+enter 在当前行后插入新行
- ctrl+shift+enter 在当前行前插入新行
- ctrl+v

快捷键 页内跳转
- up/down: 按行滚动
- pgup/pg: 按页滚动
- ctrl+home/end: 跳转到页头/页尾
- ctrl+g：跳转到指定行
- ctrl+shift+o: 跳转到符号(变量)

快捷键 文件跳转
- ctrl+鼠标左键
- ctrl+p

快捷键 tab跳转
- ctrl[+shift]+tab：切换到上一个/下一个tab
- alt+1~9 跳转到具体的Tab
- ctrl+\: 拆分编辑器

快捷键 注释
- ctrl+/ 切换行注释
- ctrl+alt+a 切换块注释

快捷键 视图
- ctrl+b 显示/隐藏左侧
- ctrl+` 显示/隐藏终端

代码片段
- snippets 工作区 用户 默认

emmet
- 辅助编写html/css的工具

全局搜索
- ctrl+shift+f ctrl+f 正则搜索替换

### 调试
- 调试javascript
- 调试vue

### 插件
编辑器
- chinese
- one dark pro主题
- material icon theme 图标主题

javascript支持
- javascript(es6) code snippets 常用ES6代码片段
- eslint
- prettier

vue
- vue languages features(volar)
- typescript vue plugin
- vue vscode snippets

dev
- open in browser
- live server
- power tools
- copilot
- tabnine

remote
- remote ssh
- remote ssh editing configuration files

### 插件开发
- yo
- yo-generator-code

## 桌面软件
chrome

vscode

git

node

utools

snipaste

shadowsocketR

ssh

windows terminal

docker desktop

## category
工具
- anyrule
- numeral
- lodash
- dayjs
- class-transformer
- class-validator

vue
- vue
- vue2
- vue-router
- vuex
- pinia
- vue-i18n
- vuepress
- vue-loader
- vite-plugin-vue
- vite-plugin-vue-jsx

vite
- babel
- swc
- postcss
- rollup
- esbuild
- vite
- webpack

社区
- 稀土掘金
- 博客园
- v2ex
- 知乎

教程
- mdn
- 菜鸟教程
- jvascript info
- 阮一峰
- 小火柴
- 张鑫旭
- 廖雪峰
- 神光

xlsx
- xlsx
- pdf.js

软件
- vscode/sublime/webstorm/idea
- chrome/edge/firefox/safari
- git/svn/github desktop
- nodejs
- utools
- snipaste
- shadowsocketR
- potplayer

vscode
- eslint
- prettier
- chinese
- git graph
- live server
- open in browser
- material icon theme
- one dark pro
- remote ssh
- volar
- power tools
- github copilot
- dev containers

chrome
- fehelper
- tampermonkey
- automa
- stylus/stylish

## axios
设配器
```javascript
const knownAdapters = {
  xhr: xhrAdapter,
  http: httpAdapter,
}

const adapters = {
  adapters: knownAdapters,

  getAdapter(adapters) {
    let adapter

    adapters = arriafy(adapters);
    for(){}

    return adapter;
  }
}
```
任务编排
```javascript
const chain = [ resolve1, reject1, dispatchRequeset,undefined, resolve2, reject2 ];

for(let i=0; i<chain.length; i++) {
  promise = promise.then([chain[i++]], chain[i++]);
}
// reject不显示返回Promise.reject的话，默认为resovle
```

## NestJS
router => layer => route
http => connect => express => nestjs

## connect
```javascript
function connect() {
  function app(req, res, next) {
    app.handle(req, res, next);
  }
  app.route = '/';
  app.stack = [];
  app.__proto__ = {
    stack: [],
    use(route, handle) {
      this.stack.push({ route, handle })
      return this;
    },
    handle() {
      stack = this.stack
      let index = 0
      function next() {
        stack[index++]()
      }
      next();
    },
    listen() {
      const server = http.createServer(this);
      return server.listen.apply(server, arguments);
    }
  }
  return app;
}
```


/**
 * express = createApplication => app app.get => router.route => layer { ...layer, route  } => new Route
 *
 */

// router
const _router = {
  params: {},
  stack: [
    // Layer
    {
      path: undefined,
      params: undefined,
      // Route
      route: {
        path: '/posts/:id',
        methods: {
          post: true,
        },
        stack: [
          // Layer
          {
            path: undefined,
            method: 'post',
            handle: () => {}
          }
        ],
        get() {
          this.stack.push(layer);
        }
      }
    }
  ]
}


// vite如何加载.vue文件
- 将<template>编译为render函数
- 将<script setup>编译为setup函数
- 将<script>编译为默认导出
- 将<style>编译为 import 'xx.vue?vue&type=style&index=0&scoped=true&lang.less'
- 拼接导出
> ps：也可以使用 import script from 'xx.vue?vue&type=script' 导出对应block。

## TODO
- 热更新