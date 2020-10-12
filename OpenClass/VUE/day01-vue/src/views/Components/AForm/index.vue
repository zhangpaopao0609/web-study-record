<template>
  <div style="text-align:center; margin-top:100px">
    
    <AForm :model="model" :rules="rules" ref="aform">
      
      <AFormItem label="用户" prop="username">
        <Ainput v-model="model.username" type="text" />
      </AFormItem>
      
      <AFormItem label="密码" prop="password">
        <Ainput v-model="model.password" type="password" />
      </AFormItem>
      <AFormItem>
        <button @click="onLogin">login in</button>
      </AFormItem>
    </AForm>
    
    {{ model }}
  </div>
</template>

<script>
import Ainput from "./Ainput";
import AFormItem from "./AFormItem";
import AForm from "./AForm";

export default {
  components: {
    Ainput,
    AFormItem,
    AForm
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return { 
      model: {
        username: '',
        password: ''
      },
      rules: {
        username: [ { required:true, message:'用户名必填' } ],
        password: [ { required:true, message:'密码必填' } ]
      }
    }
  },
  methods: {
    onLogin() {
      this.$refs.aform.validate( isValid => {
        if( isValid ) {
          alert('登录')
        }else {
          alert('失败')
        }
      } )
    }
  }
}
</script>

<style scoped>

</style>