<template>
  <div>
    <div class="sidenav">
      <router-link v-for="note in notes" class='router-link' :key="note._id" :to="'/notes/' + note._id"><img class='note-icon' src="@/assets/note.png" alt="">{{ note.title }}</router-link>
      <a href="#" @click='newNote()' v-if="!isPresentation">+ Add a page</a>
    </div>
    <div class="main">
      <router-view :key="$route.fullPath"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/runtime-core';
import { useStore }  from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    store.dispatch('note/getAllNotes')
    const notes = computed(() => store.state.note.all);
    const newNote = () => {
       store.dispatch("note/newNote").then((newNote) => {
        router.push({path: `/notes/${newNote._id}`})
      });
    }
    console.log(computed(() => store.getters['auth/isAuthenticated']))
    return {
      notes,
      newNote,
      isPresentation: computed(() => !store.getters['auth/isAuthenticated'])
    }
  }
})
</script>


<style scoped>
@media only screen and (max-width: 600px) {

}

@media only screen and (min-width: 600px) {
  /* The sidebar menu */
  .sidenav {
    height: 100%; /* Full-height: remove this if you want "auto" height */
    width: 160px; /* Set the width of the sidebar */
    position: fixed; /* Fixed Sidebar (stay in place on scroll) */
    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0; /* Black */
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 20px;
  }
}

.note-icon {
   vertical-align: middle;
}

.router-link {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

/* The navigation menu links */
.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 14px;
  color: black;
  display: block;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover {
   background: #f1f0f0;
}
/* Style page content */
.main {
  margin-left: 160px; /* Same as the width of the sidebar */
  padding: 0px 10px;
}

/* On smaller screens, where height is less than 450px, change the style of the sidebar (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
</style>

<style>
body {
  font-family: "MonoLisa"
}
</style>