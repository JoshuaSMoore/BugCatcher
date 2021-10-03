<template>
  <div class="BugDetailsPage container-fluid">
    <div class="row my-5 align-content-center" v-if="currentBug">
      <div class="col-12 d-flex justify-content-center">
        <div class="d-flex shadow p-2">
          <h1 class="my-auto">
            {{ currentBug.title }}
          </h1>
        </div>
      </div>
    </div>
    <div class="row justify-content-center rounded">
      <div class="col-6 bg-light p-2 shadow rounded">
        <div class=" m-0 p-2 d-flex justify-content-between" v-if="currentBug.id">
          <div class="form-check form-switch" v-if="!currentBug.closed && account.id === currentBug.creatorId" @click="toggleClosed()">
            <label class="form-check-label" for="flexSwitchCheckDefault">Bug Status</label>
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
          </div>
          <div class="div">
            <p>
              {{ currentBug.description }}
            </p>
          </div>
          <div class="row text-left">
            <p class="mr-5">
              Submitted by:{{ currentBug.creator.email }}<br>
              <img :src="currentBug.creator.picture" class="rounded-circle" height="25" alt="">
            </p>
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <button class="btn-btn bg-primary rounded shadow text-light" v-if="!currentBug.closed" data-bs-toggle="modal" data-bs-target="#note-form">
          Add a Note
        </button>
        <div class="container-fluid">
          <Note v-for="note in notes" :key="note.id" :note="note" class="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { bugsService } from '../services/BugsService.js'
import { AppState } from '../AppState.js'
import Pop from '../utils/Pop.js'
import { Bug } from '../Models/Bug.js'
import { notesService } from '../services/NotesService.js'
export default {
  props: {
    bug: { type: Bug, required: true }
  },
  setup(props) {
    const route = useRoute()
    const editable = ref({})
    onMounted(async() => {
      try {
        await bugsService.getBugById(route.params.bugId)
      } catch (error) {
        Pop.toast(error, 'error')
      }
      try {
        await notesService.getNotes(route.params.bugId)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      editable,
      route,
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
      currentBug: computed(() => AppState.currentBug),
      bugs: computed(() => AppState.bugs),
      notes: computed(() => AppState.notes),

      async editBug(bugId) {
        await bugsService.editBug(bugId)
      },
      async toggleClosed(bugId) {
        try {
          editable.value.bugId = props.bugId
          this.currentBug._id = route.params.id
          this.currentBug.closed = !this.currentBug.closed
          await bugsService.closeBug(route.params.bugId, editable.value)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
