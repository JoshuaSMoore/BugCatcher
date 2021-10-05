<template>
  <div v-if="currentBug">
    <div class="container-fluid p-2 card rounded shadow style-top mt-4">
      <div class="row p-2 align-content-center text-end">
        <div>
          <div class="text-start">
            <button class="btn-btn bg-primary rounded shadow text-dark border-warning detailsbtn" title="Edit bug" v-if="!currentBug.closed" data-bs-toggle="modal" data-bs-target="#edit-form">
              Edit Bug
            </button>
          </div>
          <button class="btn-btn bg-danger lighten-10 text-dark rounded shadow detailsbtn" title="Track Bug" v-if="!trackedbug" @click.prevent="trackedBug(currentBug.id)">
            TrackBug
          </button>
          <div v-else>
            <button class="btn-btn bg-secondary lighten-10 text-dark rounded shadow border-warning detailsbtn" title="Untrack Bug" @click="deleteTrackedBug(account.id)">
              Untrack
            </button>
          </div>
        </div>
        <div class="col-12 d-flex justify-content-center">
          <h2 class="">
            {{ currentBug.title }}  <i class="mdi mdi-bug mdi-36px text-primary"></i>
          </h2>
        </div>
        <div v-if="trackedbug">
          <p>
            Whos tracking this bug:
          </p>
          <h6> <img :src="trackedbug.tracker.picture" height="30" class="rounded-circle"> {{ trackedbug.tracker.name }}</h6>
        </div>
      </div>
      <div class="row justify-content-center rounded">
        <div class="col-8 card bg-secondary lighten-5 p-2 shadow rounded d-flex justify-content-between border-primary bugs-card" v-if="currentBug.creator">
          <div class="container-fluid">
            <div class="row">
              <div class="col-2 ">
                <span
                  v-if="!currentBug.closed == true"
                >
                  <div class="text-start">
                    <small>Status</small>
                    <div class="text endform-check form-switch" v-if="!currentBug.closed && account.id === currentBug.creatorId" @click="toggleClosed()">
                      <input class="form-check-input" title="Close Bug" type="checkbox" id="flexSwitchCheckDefault">
                    </div>
                    <i class="mdi mdi-circle mdi-36px text-success"></i>
                  </div></span>
                <span v-else>
                  <i class="mdi mdi-circle mdi-36px text-danger"></i>
                </span>
              </div>
              <div class="col-md-8 text-end mt-2">
                <blockquote class="blockquote text-center">
                  Details:<br>
                  {{ currentBug.description }}
                </blockquote>
              </div>
              <div class="col-md-2 text-end mt-3">
                <h6>
                  Bug By: <img :src="currentBug.creator.picture" class="rounded-circle" height="40" alt="">
                  {{ currentBug.creator.email }}<br>
                </h6>
              </div>
            </div>
            <div class="p-2 d-flex" v-if="currentBug.id">
            </div>
          </div>
        </div>
        <div class="container-fluid notescard" v-if="currentBug.id">
          <div class="row justify-content-center pt-1">
            <div class="card header-style shadow lighten-5 border-primary pt-2 bg-secondary">
              <div>
                <button class="btn-btn bg-primary rounded shadow text-dark border-warning" title="Add a note" v-if="!currentBug.closed" data-bs-toggle="modal" data-bs-target="#note-form">
                  Add a Note
                </button>
              </div>
              <h4 class="text-center pb-2 text-light lighten-20 pb-4">
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
  <Modal id="edit-form">
    <template #modal-title>
      Edit Bug
    </template>
    <template #modal-body>
      <editForm :bug="currentBug" />
    </template>
  </Modal>
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
  max-width: 50rem;
    background-color: rgba(39, 175, 216, 0.787);
}
.note-card{
  max-width: 90rem;
  min-height:15rem;
}
.detailsbtn{
  max-width: 6rem;
  min-width: 6rem;
}
.bugs-card{
  min-height:13rem;
}
.style-top{
  background-color: rgba(39, 175, 216, 0.274);
}

</style>
