---
title: vscode以及eslint配置及说明
tags: 规范|eslint|vscode
author: zyh
sort: 1
---

编辑器代码风格一致，是前端代码规范的一部分，以下主要针对 **VS Code** 做配置和说明，建议使用 **VS Code** 作为前端主要 IDE，目前插件市场对于 **VS Code** 的更新相对优先，也能更好的迎合新技术栈

## 1.安装插件

首先，安装必要插件 eslint、Vetur、Prettier

其他插件推荐：

- GitLens（文件对比，历史记录更能强大）
- vscode-icons (文件类型 icon，层级更清晰)
- One Dark Pro （主题，代码颜色区分，但这个还是看个人喜好，也有其他好看的主题）
- Vue VScode Snippets （vue 代码片段，熟悉后能增加效率）
- 后面如果有好用的插件可以在这里补充。。。

## 2.vscode 配置文件

```json
{
  "files.associations": {
    "*.vue": "vue",
    "*.js": "javascript",
    "www": "javascript",
    "*.wxml": "wxml"
  },
  "emmet.triggerExpansionOnTab": true,
  "emmet.includeLanguages": {
    "vue-html": "html",
    "Vue": "html"
  },
  "eslint.validate": ["javascript", "javascriptreact", "html", "vue", "typescript", "typescriptreact"],
  "workbench.colorTheme": "One Dark Pro",
  "workbench.iconTheme": "vscode-icons",
  "window.zoomLevel": 0,
  "git.autofetch": true,
  "git.ignoreMissingGitWarning": true,
  "git.confirmSync": false,
  "git.enableSmartCommit": true,
  "explorer.confirmDelete": false,
  "explorer.confirmDragAndDrop": false,
  "files.exclude": {
    "**/.git": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true
  },
  "javascript.format.enable": false,
  "javascript.format.insertSpaceAfterConstructor": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "vetur.format.defaultFormatter.css": "none",
  "vetur.format.defaultFormatter.html": "none",
  "vetur.format.defaultFormatter.js": "none",
  "vetur.format.defaultFormatter.less": "none",
  "vetur.format.defaultFormatter.postcss": "none",
  "vetur.format.defaultFormatter.scss": "none",
  "vetur.format.defaultFormatter.stylus": "none",
  "vetur.format.defaultFormatter.ts": "none"
}
```

## 3.eslint+prettier 配置

- 安装插件 npm install -D prettier （eslint 的依赖一般可以在 vuecli 脚手架中生成，无需手动安装，选择 airbnb 规则，版本 2 和 3 有不同，但不影响使用，cli3 生成依赖主要包括：

@vue/cli-plugin-eslint、@vue/eslint-config-airbnb、babel-eslint、eslint、eslint-plugin-vue

）

- eslint 配置文件【.eslintrc】主要是 airbnb 的默认配置+个人配置，后期如过相对严格的限制无法通过，可以使用/_ eslint-disable _/ 或 // eslint-disable-line，前者针对注释下方的代码，后者针对”行“，也能配合 eslint-enable 做局部处理

  ```json
  {
    "root": true,
    "env": {
      "node": true
    },
    "extends": ["plugin:vue/essential", "@vue/airbnb"],
    "rules": {
      "import/extensions": [
        "error",
        "always",
        {
          "js": "never",
          "vue": "never"
        }
      ],
      "no-param-reassign": ["error", { "props": false }],
      "max-len": 0,
      "vue/no-parsing-error": [
        "error",
        {
          "x-invalid-end-tag": false
        }
      ],
      "no-underscore-dangle": 0,
      "no-restricted-syntax": 0,
      "import/no-dynamic-require": 0,
      "global-require": 0,
      "prefer-destructuring": 0,
      "no-continue": 0,
      "linebreak-style": 0,
      "no-template-curly-in-string": 0,
      "no-useless-escape": 0,
      "vue/html-self-closing": 0,
      "vue/no-use-v-if-with-v-for": 0,
      "no-return-assign": 0,
      "arrow-parens": ["error", "as-needed"]
    },
    "parserOptions": {
      "parser": "babel-eslint"
    }
  }
  ```

* prettier 配置文件【.prettierrc】

  ```json
  {
    "singleQuote": true,
    "trailingComma": "all",
    "printWidth": 180
  }
  ```

## 4.总结

以上配置完成后可在代码中使用快捷键格式化代码，或者 ctrl+s 保存自动格式化，前者通过 prettier，后者检查 eslint 规范且格式化
