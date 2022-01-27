module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  // extends: ["plugin:vue/essential", "@vue/prettier"],//这里面的@vue/prettier去掉
  extends: ["plugin:vue/essential"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-const-assign": 2,//禁止修改const声明的变量
    "no-constant-condition": 2,//禁止在条件中使用常量表达式 if(true) if(1)
    "no-dupe-keys": 2,//在创建对象字面量时不允许键重复 {a:1,a:1}
    "no-empty": 2,//块语句中的内容不能为空
    "no-extra-semi": 2,//禁止多余的冒号
    "no-func-assign": 2,//禁止重复的函数声明
    "no-undef": 1,//不能有未定义的变量
    "no-unused-expressions": 2,//禁止无用的表达式
    "no-unreachable": 2,//不能有无法执行的代码
    "no-unused-vars": [2, {"vars": "all", "args": "after-used"}],//不能有声明后未被使用的变量或参数
    "no-use-before-define": 2,//未定义前不能使用
    "no-var": 0,//禁用var，用let和const代替
    "no-extend-native": 2,
    "indent": [2, 2],//缩进风格

  },
  parserOptions: {
    // parser: "babel-eslint"
  }
};