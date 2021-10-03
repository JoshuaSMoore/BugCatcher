<template>
  <div class="row shadow m-2 p-1">
    <div class="col-10">
      <div class="d-flex">
        <img :src="note.creator.picture" class="rounded-circle mr-4" height="40" alt="">
        <p class=" my-auto">
          {{ note.body }}
        </p>
      </div>
    </div>
    <div class="col-2 d-flex justify-content-end">
      <button class="btn text-dark" @click="deleteNote(note.id)" v-if="!currentBug.closed">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { notesService } from '../services/NotesService'
import { computed } from 'vue'
import { AppState } from '../AppState'
import { Note } from '../Models/Note.js'

export default {
  props: {
    note: { type: Note, required: true }
  },
  setup() {
    return {
      currentBug: computed(() => AppState.currentBug),

      deleteNote(noteId) {
        notesService.deleteNote(noteId)
      }
    }
  }
}
</script>

  <style lang="scss" scoped>
  </style>
