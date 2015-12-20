前言
---

身为杭电人，选课是必不可免的，但是在选课之前有一项很重要的任务就是教师评价。

这是一个比较烦的事情，尤其是课程比较多的时候。

这个时候，这个脚本或许可以帮你你减轻负担

特点
---

- 一键操作，自动填写，自动保存，自动提交
- 默认第一个为B，其他都为A
- 支持多教师评价
- 支持文字提示
- 对用户友好

使用方式
---

1. 复制代码
2. 进入教室评价页面
3. 打开开发者面板
    - `Chrome` -> `菜单` -> `更多工具` -> `开发者工具` -> 切换到`Console`
    - `Firfox` -> `工具` -> `Web开发者` -> `切换工具箱` -> 切换到`控制台`
    - `IE/Edge` -> 身为Mac系统，无法打开。。。请自行寻找
    - `Safari` -> `开发` -> `显示 Web 检查器` -> 切换到`控制台`
    - `QQ/猎豹/360/傲游`等其他国产浏览器 -> 
        - 极速模式 -> 同`Chrome`
        - 兼容模式 -> 同`IE`
        - Edge模式 -> 同`Edge`
4. 然后粘贴入复制的代码
5. Enter
6. 上个厕所等待结果吧

兼容性
---

- Mac
    - Chrome *OK*

- Window
    - Chrome *OK*
    - 360
        - Chrome kernel (极速模式) *OK*

TODO
---

- [x] 支持自定义评价等级
- [ ] 允许中途暂停
- [ ] 对普通用户更加友好
- [ ] 多终端浏览器测试

贡献
---
直接给我提Issus或者pr就好

大家只需要修改`evaluate.js`代码，压缩版本的不需要修改，等待我审核过了之后，便更新.

欢迎大家在测试之后将浏览器的兼容性结果告诉我，我将继续更新