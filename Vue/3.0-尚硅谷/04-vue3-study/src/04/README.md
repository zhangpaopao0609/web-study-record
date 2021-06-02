# setup 的细节
# 执行时间
setup 是在 beforeCreate 生命周期回调之前就执行了，而且就执行一次
setup 在执行的时候，当前的组件还没有创建出来，也就意味: 组件实例对象 this 根本就不能用

## 父 子 组件执行顺序
parent-setup
parent-beforeCreate
parent-created
parent-beforeMount
child-setup
child-beforeCreate
child-created
child-beforeMount
child-mounted
parent-mounted

# setup 的返回值
- 一般都返回一个对象：为模板提供数据，也就是模板中可以直接使用此对象中的所有属性/方法
- 返回对象中的属性会与data函数返回对象的属性合并成组件对象的属性
- 返回对象中的方法会与 methods 中的方法合并组件对象的方法
- 如果有重名，setup 优先
- 注意
  - 一般不要混合使用： methods 中可以访问 setup 提供的属性和方法，但是在 setup 方法中不能访问 data 和 methods
  - setup 不能是一个 async 函数： 因为 async 函数返回值是一个 promise 对象，这样模板就无法访问 return 中数据