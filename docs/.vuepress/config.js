const path = require('path');
module.exports = {
  base: '/Vue_Gulu/',
  title: 'UI_Gulu',
  description: 'UI框架',
  themeConfig: {
    nav: [
      {text: '主页', link: '/'},
      {text: '文档', link: '/guide/'},
      {text: '交流', link: 'https://google.com'},
    ],
    sidebar: [
      {
        title: '入门',
        collapsable: false,
        // children: [
        //
        // ]
      },
      {
        title: '组件',
        collapsable: false,
        children: [
          '/components/Button',
        ]
      },

    ]
  },
  scss: {
    includePaths: [path.join(__dirname, '../../styles')]
  }
};
