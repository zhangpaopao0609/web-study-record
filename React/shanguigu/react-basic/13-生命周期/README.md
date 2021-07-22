1. 初始化阶段： 由 ReactDOM.render() 触发 —————— 初次渲染
  - constructor()
  - componentWillMount()
  - render()
  - componentDidMount()

2. 更新阶段： 由组件内部的 this.setState() 或者 父组件重新 render 触发
  - shouldComponentUpdate()
  - componentWillUpdate()
  - render()
  - componentDidUpdate()

3. 卸载组件： 由 ReactDOM.unmountComponentAtNode() 触发
  - componentWillUnmount() 