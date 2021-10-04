<template>
  <div class="BugDetailsPage container-fluid">
    <div class="row my-5 align-content-center" v-if="currentBug">
      <div class="col-12 d-flex justify-content-center">
        <div class="d-flex shadow p-2">
          <h1 class="my-auto">
            {{ currentBug.title }}  <i class="mdi mdi-bug mdi-36px text-primary"></i>
          </h1>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row justify-content-center rounded">
      <div class="col-6 bg-light p-2 shadow rounded d-flex justify-content-between">
        <p class="">
          <!-- <small>
          Submitted by:{{ currentBug.creator.email }}<br>
          <img :src="currentBug.creator.picture" class="rounded-circle" height="25" alt="">
        </small> -->
          <br><br>
          {{ currentBug.description }}
        </p>
        <div class=" m-0 p-2 d-flex justify-content-between" v-if="currentBug.id">
          <div class="row text-left">
            <div class="col-10">
              <small>Status</small>
              <div class="form-check form-switch" v-if="!currentBug.closed && account.id === currentBug.creatorId" @click="toggleClosed()">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
              </div>
              <span v-if="!currentBug.closed == true">
                <i class="mdi mdi-circle mdi-36px text-success"></i>
                <!-- <span> {{ bug.closed }}</span> -->
              </span>
              <span v-else>
                <i class="mdi mdi-circle mdi-36px text-danger"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid" v-if="currentBug.id">
    <div class="row">
      <div class="card-header">
        <h4 class="text-center">
          {{ currentBug.title }} Notes
        </h4>
        <button class="btn-btn bg-primary rounded shadow text-light" v-if="!currentBug.closed" data-bs-toggle="modal" data-bs-target="#note-form">
          Add a Note
        </button>
      </div>
    </div>
    <div class="container-fluid">
      <Note v-for="note in notes" :key="note.id" :note="note" class="" />
    </div>
  </div>
  <Modal id="note-form">
    <template #modal-title>
      Add a Note
    </template>
    <template #modal-body>
      <NoteForm />
    </template>
  </Modal>
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
