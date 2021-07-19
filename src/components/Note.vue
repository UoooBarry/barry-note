<template>
  <div class="note-background">
    <bubble-menu
      class="bubble-menu"
      :tippy-options="{ duration: 100 }"
      :editor="editor"
      v-if="editor && !isPresentation"
    >
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        Bold
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        Italic
      </button>
      <button
        @click="editor.chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
      >
        Strike
      </button>
    </bubble-menu>

    <floating-menu
      class="floating-menu"
      :tippy-options="{ duration: 100 }"
      :editor="editor"
      v-if="editor && !isPresentation"
    >
      <button
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        H1
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        H2
      </button>
      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        Bullet List
      </button>
    </floating-menu>
    <EditorContent :editor="editor" class="floating-menu" v-if="editor" />
  </div>
</template>

<script lang="ts">
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/vue-3";
import { Extension } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Typography from "@tiptap/extension-typography";
// import { Heading, TodoItem, TodoList } from 'tiptap-extensions'
import StarterKit from "@tiptap/starter-kit";
import { defineComponent, toRefs } from "@vue/runtime-core";
import { Note } from "../api/noteApi";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

export default defineComponent({
  name: "Note",
  components: { EditorContent, FloatingMenu, BubbleMenu },
  props: {
    note: {
      type: Object as () => Note,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const noteContent = toRefs(props.note);
    const isPresentation =
      useRoute().query.presentation === "true" ? true : false;
    const saveSuccess = () => {
      createToast("Sucessfully saved!", {
        type: "success",
        position: "bottom-right",
      });
    };
    const saveFail = () => {
      createToast("Fail to save!", {
        type: "danger",
        position: "bottom-right",
      });
    };

    const save = (keydownEvent: any) => {
      if (
        keydownEvent.keyCode == 83 &&
        (keydownEvent.ctrlKey || keydownEvent.metaKey)
      ) {
        keydownEvent.preventDefault();
        if (!editor || !editor.value) {
          return;
        }

        let newNote = props.note;

        const title = editor.value.getHTML().split("</h1>")[0].substr(4);
        newNote.title = title;
        newNote.content = editor.value.getHTML();
        if (newNote.title === "new") {
          store
            .dispatch("note/saveNote", newNote)
            .then((returnNote) => {
              router.push({ path: `/notes/${returnNote._id}` });
            })
            .catch(() => {
              saveFail();
            });
          saveSuccess();
        } else {
          newNote.content = editor.value.getHTML();
          store
            .dispatch("note/updateNote", newNote)
            .then(() => saveSuccess())
            .catch(() => saveFail());
        }
      }
    };

    const Saveable = Extension.create({
      onFocus({ event }) {
        if (event && event.target) {
          // Remove before create to prevent duplicated
          event.target.removeEventListener("keydown", save);
          event.target.addEventListener("keydown", save);
        }
        return;
      },
    });

    const editor = useEditor({
      content: props.note.content.toString(),
      extensions: [StarterKit, Saveable, Document, Typography, Paragraph],
      editable: !isPresentation,
      editorProps: {
        attributes: {
          class: "notepad",
        },
      },
    });
    return {
      noteContent,
      editor,
      isPresentation,
    };
  },
});
</script>

<style lang="scss">
.note-background {
  width: 90vw;
  height: 100vh;
  float: right;
}
.ProseMirror.notepad {
  color: black;
  background-color: white;
  border: 0;
  width: 100vw;
  min-height: 100vh;
  font-size: 16px;
}
/* Basic editor styles */
.ProseMirror {
  width: 100;

  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }
}

.bubble-menu {
  display: flex;
  background-color: #0d0d0d;
  padding: 0.2rem;
  border-radius: 0.2rem;

  button {
    border: none;
    background: none;
    color: #fff;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0 0.2rem;
    opacity: 0.6;

    &:hover,
    &.is-active {
      opacity: 1;
    }
  }
}

.floating-menu {
  display: flex;
  padding: 0.2rem;
  border-radius: 0.5rem;

  button {
    border: none;
    background: none;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0 0.2rem;
    opacity: 0.6;

    &:hover,
    &.is-active {
      opacity: 1;
    }
  }
}
</style>