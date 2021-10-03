<template>
  <form @submit.prevent="createNote()">
    <div class="form-group">
      <label for="title">Note Details</label>
      <input type="text"
             class="form-control bg-light"
             name="body"
             placeholder="Enter Note Here"
             v-model="editable.body"
             required
      >
    </div>
    <div class="form-group">
      <div class="d-flex justify-content-between my-3">
        <button type="submit" class="btn btn-primary mt-2">
          Create
        </button>
      </div>
    </div>
  </form>
</template>

<script>

import { notesService } from '../services/NotesService.js'
import Pop from '../utils/Pop.js'
import { logger } from '../utils/Logger.js'
import { Modal } from 'bootstrap'
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState.js'
import { useRoute } from 'vue-router'

export default {
  props: {
    bug: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()
    const editable = ref({})
    return {
      editable,
      account: computed(() => AppState.account),
      notes: computed(() => AppState.notes),
      bugs: computed(() => AppState.bugs),
      currentBug: computed(() => AppState.currentBug),
      async createNote() {
        try {
          editable.value.bugId = props.bugId
          editable.value.bugId = route.params.bugId
          await notesService.createNote(editable.value, route.params.bugId)
          Pop.toast('Note Added', 'success')
          const modal = Modal.getInstance(document.getElementById('note-form'))
          modal.hide()
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log(error)
        }
      }
    }
  }
}
</script>

  <style lang="scss" scoped>
  </style>
