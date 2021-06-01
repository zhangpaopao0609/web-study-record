import { ref } from "vue";

export default function useCountAdd() {
  const count = ref(0);
  const handleAdd = () => {
    count.value += 1;
  };

  return {
    count,
    handleAdd,
  };
};
