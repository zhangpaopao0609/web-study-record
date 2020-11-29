module.exports = {
  interval: '*/3 * * * * *',
  handler() {
    console.log('定时任务 嘿嘿 三秒执⾏⼀次' + new Date())
  }
}