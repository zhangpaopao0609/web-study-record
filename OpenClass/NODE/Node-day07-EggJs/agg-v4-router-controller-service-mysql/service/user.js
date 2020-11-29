const delay = (data, tick) => new Promise(resolve => {
  setTimeout(() => {
    resolve(data)
  }, tick)
})

// 可复⽤的服务 ⼀个同步，⼀个异步
module.exports = {
  getName() {
    return delay('jerry', 1000)
  },
  getAge() {
    return 20
  }
};