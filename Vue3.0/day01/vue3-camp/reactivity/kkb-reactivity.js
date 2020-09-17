

// 所有的都针对他
// vue2里面

// 这就是一个大的dep
// {
//     o: {
//         age:[()=>{
//             // 数据的修改，会通知这个函数执行
//             root.innerHTML = `
//                 <h1>${obj.name}今年${obj.age}岁了， ${double.value}</h1>
//             `
//         }]
//     }
// }
// 如果大家关注TC39，class的语法，持续的讨论和变动


// 用proxy监听一个对象后，数据的获取，会触发get函数
// Obj。name 收集依赖


// Obj.name=xx 出发set，执行收集到的effect
// 用map收集所有依赖
// {
//     target: {
//         key:[effect1]
//     }
// }
let targetMap = new WeakMap()
let effectStack = []//存储effect
// 收集完成
function track(target,key){
    // 初始化
    const effect = effectStack[effectStack.length-1]
    if(effect){
        // 需要收集
        let depMap = targetMap.get(target)
        if(depMap===undefined){
            depMap= new Map()
            targetMap.set(target,depMap)
        }

        let dep = depMap.get(key)
        if(dep===undefined){
            dep = new Set()
            depMap.set(key,dep)
        }
        // 完成了初始化
        // 下面就需要收集了
        // 双向缓存
        if(!dep.has(effect)){
            dep.add(effect) // 把effect放在dep里面 村塾
            effect.deps.push(dep)
        }
    }
}
function trigger(target, key, info){
    let depMap = targetMap.get(target)
    if(depMap===undefined){
        return // 没有effect副作用
    }
    const effects = new Set()
    const computeds = new Set() // computed是一个特殊的effect

    if(key){
        let deps = depMap.get(key)
        deps.forEach(effect=>{
            if(effect.computed){
                computeds.add(effect)
            }else{
                effects.add(effect)
            }
        })
    }
    effects.forEach(effect=>effect())
    computeds.forEach(computed=>computed())

}
const baseHandler = {
    // get 和set，还有删除，是不是存在等
    get(target,key){
        const ret = target[key] // 实际中用Reflect.get(target,key)
        // @todo 收集依赖 到全局的map
        track(target,key)
        return ret //typeof ret=='object'?reactive(ret):ret
    },
    set(target,key,val){
        const info = {oldValue:target[key],newValue:val}
        target[key] = val // Reflect.set

        // @todo 这里要去拿到收集的effect，执行以下就欧克的
        trigger(target, key, info) //去执行effect
    }
}
function reactive(target){
    // Object.defineProperty  vue2的
    const observed = new Proxy(target, baseHandler)
    return observed
}
// 便于维护，便于测试
function effect(fn,options={}){
    // 只考虑执行的逻辑，
    let e = createReactiveEffect(fn,options)
    if(!options.lazy){
        e()
    }
    return e
}
function createReactiveEffect(fn,options){
    effect扩展配置
    const effect = function effect(...args){
        return run(effect, fn, args)
    }
    effect.deps = []
    effect.computed = options.computed
    effect.lazy = options.lazy
    return effect
}
// 调度，
function run(effect, fn, args){
    // 执行
    if(effectStack.indexOf(effect)===-1){
        try{
            effectStack.push(effect)
            return fn(...args)
        }finally{
            effectStack.pop()
        }
    }
}
function computed(fn){
    const runner = effect(fn, {computed:true, lazy:true})
    return {
        effect:runner,
        get value(){
            return runner()
        }
    }
}
