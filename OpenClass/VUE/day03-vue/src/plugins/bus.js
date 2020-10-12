class Bus {
  constructor() {
    
  }
}

Bus.install = function(Vue) {
  Vue.prototype.$bus = new Bus();
}  

export default Bus;