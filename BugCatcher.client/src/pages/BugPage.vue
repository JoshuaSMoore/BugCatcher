<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="div pt-2">
          <button class="btn-btn bg-primary rounded shadow text-light" data-bs-toggle="modal" data-bs-target="#bug-form">
            Add a Bug
          </button>
        </div>
        <div class="home d-flex justify-content-end pt-2">
          <div class="div text-start">
          </div>
          <div class="card-header shadow">
            <small> Sort By: </small>
            <button class="btn-btn bg-dark text-light rounded shadow" @click="order('all')">
              Updated
            </button>
            <button class="btn-btn bg-dark text-light rounded shadow" @click="order('all')">
              Priority
            </button>
            <button class="btn-btn bg-success text-dark rounded" @click="order('active')">
              Open Bugs
            </button>
            <button class="btn-btn bg-danger text-dark rounded shadow" @click="order('closed')">
              Closed Bugs
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <Bug v-for="bug in bugs" :key="bug.id" :bug="bug" class="col-md-12" />
    </div>
  </div>
  <div class="container-fluid">
    <div class="row">
    </div>
  </div>
  <Modal id="bug-form">
    <template #modal-title>
      Add a Bug
    </template>
    <template #modal-body>
      <BugForm />
    </template>
  </Modal>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { bugsService } from '../services/BugsService.js'
import { AppState } from '../AppState.js'

export default {
  setup() {
    onMounted(() => {
      bugsService.getBugs()
    })
    return {
      bugs: computed(() => AppState.bugs),
      profile: computed(() => AppState.profile),
      sort: computed(() => AppState.sort),
      bug: computed(() => AppState.bug),
      currentBug: computed(() => AppState.currentBug),

      order(status) {
        AppState.sort.order = status
      }
    }
  }
}

</script>

<style scoped lang="scss">
</style>
