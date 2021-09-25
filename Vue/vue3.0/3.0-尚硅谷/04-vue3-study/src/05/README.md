# setup 的细节

# setup 的入参
- setup(props, context) / setup(props, { attrs, emit, slots, expose })
- props： 包含 props 配置声明且传入了的所有属性的对象
  - props : { msg: String, test: String },如果这里的 msg 从父组件传递了值下来的，那么在 setup 的参数 props 参数中就有，否者就没有。当然，如果是这样 { msg: String, test : { type: String, default: '1' } }, 这样在 setup 的参数 props 中是有的
- context 参数
  - 包含了 attrs, emit, slots 以及 expose
  - attrs: 包含没有在 props 配置中声明的所有属性的对象，相当于 this.$attrs
    ```
    <template>
      <child 
        :msg="msg" 
        msg2="真香"
        class="test"
        @click="cliclkTest"
      />
    </template>
    ```
    以下是 attrs 的结果
    ```
    class: "test"
    msg2: "真香"
    onClick: ƒ cliclkTest()
    ```
  - slots: 包含所有传入的插槽内容的对象，相当于 this.$slots
    child 中的定义
    ```
    <div>
      <slot name="slotTest" ></slot>
      <slot name="default" ></slot>
    </div>
    ```
    parent 中使用
    ```
    <template>
      <child 
        :msg="msg" 
        msg2="真香"
        class="test"
        @click="cliclkTest"
      >
        <template #slotTest>
          <h2>slot test</h2>
        </template>
      </child>
    </template>
    ```
    以下是 slots 的结果
    ```
    slotTest: (...args) => {…}
    _: 1
    __vInternal: 1
    ```
  - emit 用来分发自定义事件的函数，相当于 this.$emit
