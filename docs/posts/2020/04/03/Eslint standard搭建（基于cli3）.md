---
title: Eslint standard搭建（基于cli3）
tags: 规范|eslint|vscode
author: zyh
---

## 初始化 eslint

```bash
npx eslint --init

? How would you like to use ESLint? To check syntax, find problems, and enforce code style
? What type of modules does your project use? JavaScript modules (import/export)
? Which framework does your project use? Vue.js
? Does your project use TypeScript? No
? Where does your code run? Browser
? How would you like to define a style for your project? Use a popular style guide
? Which style guide do you want to follow? Standard: https://github.com/standard/standard
? What format do you want your config file to be in? JavaScript
```

## 额外安装

```bash
npm install babel-eslint @vue/cli-plugin-eslint @vue/eslint-config-standard -D
```

## 配置文件

```js
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    uni: true,
    wx: true,
    getApp: true,
    getCurrentPages: true,
  },
  rules: {
    // 统一缩进2个空格
    indent: ['error', 2, { SwitchCase: 1 }],
    // 强制for循环按照正确的方向前进
    'for-direction': 'error',
    // switch语句必须有default分支
    'default-case': 'error',
    // 不允许使用空函数
    'no-empty-function': 'error',
    // 禁止在没有类型检查的情况下与null比较
    'no-eq-null': 'error',
    // 禁止在变量定义之前使用他
    'no-use-before-define': 'error',
    // 变量的命名一律使用驼峰命名
    camelcase: 'error',
    // switch 的冒号之后有空格
    'switch-colon-spacing': ['error', { after: true, before: false }],
    // 箭头函数的箭头前后都有空格
    'arrow-spacing': 'error',
    // 要求非空文件末尾存在一行空行
    'eol-last': 'error',
    // 回调函数中必须有容错处理
    'handle-callback-err': 'error',
    // 禁止行尾空格
    'no-trailing-spaces': 'error',
    // 禁止出现多行空行
    'no-multiple-empty-lines': 'error',
    // 禁止在单行内非缩进情况出现多个空格
    'no-multi-spaces': 'error',
    // 使用'==='来代替'=='
    eqeqeq: 'error',
    // 遵循大括号约定
    curly: 'error',
    // 禁止与自身比较 , if (x===x){}
    'no-self-compare': 'error',
    // 禁止重复导入
    'no-duplicate-imports': 'error',
    // 函数名后不需要空格
    'space-before-function-paren': ['error', { anonymous: 'never', named: 'never', asyncArrow: 'never' }],
    // 禁止在生产环境出现alert
    'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
```
