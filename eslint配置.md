
```
module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
    }
};
```

文件中有以下配置项：
* `env`：指定代码的运行环境
* `extends`： 指定 eslint 规范
* `globals`： 声明在代码中的自定义全局变量
* `parserOptions`： 设置解析器选项
* `plugins`：引用第三方的插件
* `rules`： 启用额外的规则或覆盖默认的规则