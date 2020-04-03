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