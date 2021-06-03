<script lang="ts">
import { defineComponent, isRef, ref } from 'vue'

export default defineComponent({
  setup() {
    console.log(isRef(ref()));
  },
})
</script>
