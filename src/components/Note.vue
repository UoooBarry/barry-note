<template>
  <div class="note-background">
    <textarea type="text" class="notepad" @focus="editing"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
export default defineComponent({
  name: 'Note',
  setup() {
    const editing = (e) => {
      e.target.onkeydown = (keydownEvent) => {
        if(keydownEvent.keyCode == 83 && (keydownEvent.ctrlKey || keydownEvent.metaKey)) {
          keydownEvent.preventDefault();
          console.log("save event happen")
        }
      }
    }
    return {
      editing
    }
  }
})
</script>

<style scoped>
.note-background {
  width: 90vw;
  height: 100vh;
  float: right;
}
.notepad{
  color: black;
  background-color: white;
  border: 0;
  min-width: 100%;
  min-height: 100%;
  font-size: 16px;
}
</style>