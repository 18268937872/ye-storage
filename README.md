### YeStorage 使用

- 实例化一个YeStroage
    let YeStroage = new YeStroage('@','_') // 键值前缀 值与过期时间的分割线 (可不填)

- 设置数据
    YeStroage.set('userInfo',{username:'叶小秋',age:22},null,new Date().getTime()+1000*60*60*24) // 键值 数据 回调函数 过期时间 {status:0,key:'userInfo',value:{name:'叶小秋',age:22}}

- 获取数据
    YeStroage.get('userInfo',null) // 键值 回调函数 {status:0,value:'{name:'叶小秋',age:22}'}

- 删除数据
    YeStroage.remove('userInfo',null) // 键值 回调函数 {status:0,value:'{name:'叶小秋',age:22}'}

+ 返回状态 status
    success: 0, // 成功
    failure: 1, // 失败
    overflow: 2, // 溢出
    timeout: 3 // 超时