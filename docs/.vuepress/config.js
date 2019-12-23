module.exports = {
  title: "前端",
  description: "顺丰华东小微",
  evergreen: true,
  head: [["link", { rel: "icon", href: `/favicon.ico` }]],
  themeConfig: {
    lastUpdated: true,
    // nav: [
    //   { text: "专题", link: "/thematic/" },
    //   { text: "开源项目", link: "/opensouce/" },
    //   { text: "规范", link: "/rules/" },
    //   { text: "笔记", link: "/summary/" },
    //   { text: "面试题库解析", link: "/interview_question/" },
    //   { text: "GitLab", link: "http://10.158.1.157/web" }
    // ]
  },
  plugins: [
    require('./plugins/blog')
  ]
};
