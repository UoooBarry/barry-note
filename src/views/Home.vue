<template>
  <div>
    <Note :note="note" v-if="note"/>
  </div>
</template>

<script language="ts">
import { defineComponent, computed } from '@vue/runtime-core';
import Note from '@/components/Note';
import { useRoute } from 'vue-router';
import { useStore }  from 'vuex';

export default defineComponent({
  components: {
    Note
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const id = route.params.id;
    const note = computed(() => store.getters['note/findNote'](id));

    return {
      note
    }
  }
})
</script>
