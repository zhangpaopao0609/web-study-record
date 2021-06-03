import { ref, onMounted, onBeforeUnmount } from "vue";

export default function useGetMousePosition() {
  const x = ref(0);
  const y = ref(0);

  const handler = e => {
    x.value = e.clientX;
    y.value = e.clientY;
  };

  onMounted(() => {
    window.addEventListener('mousemove', handler);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', handler);
  });
  
  return {
    x,
    y,
  };
};
