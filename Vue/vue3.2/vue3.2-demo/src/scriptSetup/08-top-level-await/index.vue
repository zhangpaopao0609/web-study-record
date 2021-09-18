<script setup lang="ts">
const res = await fetch(`https://api.uomg.com/api/get.kg?songurl=https://node.kg.qq.com/play?s=YaCv8EYfJunVWYcH`).then(r => r.json())
console.log(res);
</script>

