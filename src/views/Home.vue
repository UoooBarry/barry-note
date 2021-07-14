<template>
  <div class="home">
    <Note />
  </div>
</template>

<script language="ts">
// @ is an alias to /src
import { defineComponent } from '@vue/runtime-core';
import Note from '@/components/Note';

export default defineComponent({
  name: 'Home',
  components: {
    Note
  }
})
</script>
