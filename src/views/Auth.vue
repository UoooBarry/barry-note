<template>
  <div class="note-background">
    <h1>Simple auth</h1>
    <form @submit.prevent="register">
      <input type="text" v-model="key" class="note-style">
      <br>
      <input type="submit" class='btn'>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
import { useStore }  from 'vuex';
import { useRouter }  from 'vue-router';


export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const key = ref('');

    const register = () => {
      store.dispatch("auth/authorize", key.value);
      router.push({path: "/"})
    }

    return {
      key,
      register
    }
  },
});
</script>

<style scoped>
.note-style {
  border: none;
  width: 90vw;
  height: 20vh;
  font-size: 20px;
}
.btn {
  margin-left: 40%;
  border: 1px solid black;
  background-color: white;
  padding: 18px;
  border-radius: 5px;
  width: 200px;
  text-align: center;
  cursor: pointer;
}
</style>