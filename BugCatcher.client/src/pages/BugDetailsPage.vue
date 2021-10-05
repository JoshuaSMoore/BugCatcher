<template>
  <div v-if="currentBug">
    <div class="container-fluid p-2">
      <div class="row p-2 align-content-center">
        <button class="btn-btn bg-primary rounded shadow text-dark border-warning" title="Edit bug" v-if="!currentBug.closed" data-bs-toggle="modal" data-bs-target="#edit-form">
          Edit Bug
        </button>
        <button class="btn-btn bg-danger lighten-10 text-dark rounded shadow" title="Track Bug" v-if="!trackedbug" @click="trackedBug(currentBug.id)">
          Track Bug
        </button>
        <div v-else>
          <button class="btn-btn bg-Primary lighten-10 text-dark rounded shadow" title="Track Bug" @click="deleteTrackedBug(account.id)">
            Remove
          </button>
        </div>
        <div class="col-12 d-flex justify-content-center">
          <h3>
            {{ currentBug.title }}  <i class="mdi mdi-bug mdi-36px text-primary"></i>
          </h3>
        </div>
        <div class="row justify-content-center rounded">
          <div class="col-8 card bg-secondary lighten-5 p-2 shadow rounded d-flex justify-content-between border-primary" v-if="currentBug.creator">
            <p>
              <img :src="currentBug.creator.picture" class="rounded-circle" height="50" alt="">
              Submitted by:{{ currentBug.creator.email }}<br>
            </p>
            <br><br>
            <p class="text-center">
              {{ currentBug.description }}
            </p>
            <p>
              Whos tracking this bug:
            </p>
            <br>
            <span v-if="!currentBug.closed == true">
              <i class="mdi mdi-circle mdi-36px text-success"></i>
              <!-- <span> {{ bug.closed }}</span> -->
            </span>
            <div class="p-2 d-flex" v-if="currentBug.id">
              <small>Status</small>
              <div class="form-check form-switch" v-if="!currentBug.closed && account.id === currentBug.creatorId" @click="toggleClosed()">
                <input class="form-check-input" title="Close Bug" type="checkbox" id="flexSwitchCheckDefault">
              </div>
              <span v-else>
                <i class="mdi mdi-circle mdi-36px text-danger"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid" v-if="currentBug.id">
        <div class="row justify-content-center">
          <div class="card header-style shadow bg-secondary lighten-5 border-primary pt-2">
            <div>
              <button class="btn-btn bg-primary rounded shadow text-dark border-warning" title="Add a note" v-if="!currentBug.closed" data-bs-toggle="modal" data-bs-target="#note-form">
                Add a Note
              </button>
            </div>
            <h4 class="text-center pb-2">
              {{ currentBug.title }} Notes
            </h4>
          </div>
        </div>
        <div class="container-fluid p-1">
          <div class="col-12">
            <div class="row justify-content-center">
              <div class="card bg-secondary lighten-5 note-card border-primary">
                <Note v-for="note in notes" :key="note.id" :note="note" class="" />
              </div>
            </div>
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
      </div>
    </div>
    <Modal id="edit-form">
      <template #modal-title>
        Edit Bug
      </template>
      <template #modal-body>
        <editForm :bug="currentBug" />
      </template>
    </Modal>
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { bugsService } from '../services/BugsService.js'
import { AppState } from '../AppState.js'
import Pop from '../utils/Pop.js'
import { notesService } from '../services/NotesService.js'
import { trackedBugsService } from '../services/TrackedBugsService.js'
export default {

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
      try {
        await bugsService.getTrackedBugs(route.params.bugId)
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
      trackedbug: computed(() => AppState.trackedbugs.find(b => b.accountId === AppState.account.id)),

      async toggleClosed(bugId) {
        try {
          editable.value.bugId = props.bugId
          this.currentBug._id = route.params.id
          this.currentBug.closed = !this.currentBug.closed
          await bugsService.closeBug(route.params.bugId, editable.value)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async trackedBug(id) {
        try {
          await trackedBugsService.createTrackedBug(id)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async deleteTrackedBug(accountId) {
        try {
          await trackedBugsService.deleteTrackedBug(accountId)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-style{
  max-width: 80rem;
}
.note-card{
  max-width: 90rem;
}
</style>
