# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 新的dist目录未初始化git 需要重新初始化并添加所有文件后提交
git init
git add -A
git commit -m 'deploy'

# 推送到gh-pages分支
git push -f https://github.com/Harveyzhao/press.git master:gh-pages
cd ../../../
