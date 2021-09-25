const {ref, effect} = require('@vue/reactivity')
// 独立的包是可以放在任何框架用
let count = ref(1)

effect(()=>{
    // 副作用
    console.log('count是',count.value)
})

setInterval(()=>{
    count.value++
},1000)