<template>
  <div class="row m-2 p-1 justify-content-center">
    <div class="col-md-10 card bg-primary lighten-10 border-warning">
      <div class="div">
        <img :src="note.creator.picture" class="rounded-circle mr-4" height="30" alt="">
        {{ note.creator.name }}
      </div>
      <div class="on-hover text-end" style="right: 1rem; top: 1rem" v-if="account.id == note.creatorId">
        <i class="mdi mdi-delete text-danger f-30 selectable" title="Delete Note" @click="deleteNote( note.id )" v-if="!currentBug.closed">
          Delete
        </i>
      </div>
      <div class="">
        <h6 class="">
          {{ note.body }}
        </h6>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script>
import { notesService } from '../services/NotesService'
import { computed } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { logger } from '../utils/logger'

export default {
  props: {
    note: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()
    return {
      route,
      currentBug: computed(() => AppState.currentBug),
      notes: computed(() => AppState.notes),
      bugs: computed(() => AppState.bugs),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),

      async  deleteNote(id) {
        logger.log('trying to delete this', id)
        await notesService.deleteNote(id)
      }
    }
  }
}
</script>

  <style lang="scss" scoped>
  </style>
