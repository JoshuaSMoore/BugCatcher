<template>
  <div class="row m-2 p-1">
    <div class="col-2"></div>
    <div class="col-md-8 card">
      <div class="div">
        <img :src="note.creator.picture" class="rounded-circle mr-4" height="30" alt="">
        {{ note.creator.name }}
      </div>
      <div class="on-hover text-end" style="right: 1rem; top: 1rem" v-if="account.id == note.creatorId">
        <i class="mdi mdi-delete text-danger f-30 selectable" @click="deleteNote(noteId)" v-if="!currentBug.closed">
          Delete
        </i>
      </div>
      <div class="card-body shadow p-1">
        <h5 class="">
          {{ note.body }}
        </h5>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script>
import { notesService } from '../services/NotesService'
import { computed } from 'vue'
import { AppState } from '../AppState'

export default {
  props: {
    note: { type: Object, required: true }
  },
  setup(props) {
    return {
      currentBug: computed(() => AppState.currentBug),
      notes: computed(() => AppState.notes),
      bugs: computed(() => AppState.bugs),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),

      async  deleteNote(noteId) {
        await notesService.deleteNote(noteId)
      }
    }
  }
}
</script>

  <style lang="scss" scoped>
  </style>
