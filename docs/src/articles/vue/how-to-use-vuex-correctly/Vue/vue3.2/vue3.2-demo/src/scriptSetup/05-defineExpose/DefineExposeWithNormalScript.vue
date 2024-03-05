<script lang="ts">
export default { name: 'TestDefineExpose' }
</script>

<script setup lang="ts">
import { reactive, ref } from "@vue/reactivity";

interface RuleForm {
  name: string;
};

const ruleForm = reactive<RuleForm>({
  name: '',
});

const rules = {
  name: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
  ],
};
const ruleFormRef = ref<{ validate: () => boolean } | null>(null);
const validate = () => ruleFormRef.value?.validate();
</script>

<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef" label-width="100px" class="demo-ruleForm">
    <el-form-item label="活动名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
  </el-form>
</template>
