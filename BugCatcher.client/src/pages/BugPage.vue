<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3">
        <div class="div pt-2 ps-2 d-flex justify-content-start">
          <button class="btn-btn bg-primary rounded shadow text-dark bugbtn" data-bs-toggle="modal" data-bs-target="#bug-form" title="Add a Bug">
            Add a Bug <i class="mdi mdi-bug mdi-24px text-dark"></i>
          </button>
        </div>
      </div>
      <div class="col-9">
        <div class="home d-flex justify-content-end">
          <div class="div text-start">
          </div>
          <div class="row result-controls pe-3 pt-2" @contextmenu.prevent v-if="bugs.length">
            <div class="card-header shadow bg-secondary lighten-10 rounded">
              <small> Sort By: </small>
              <button class="btn-btn bg-secondary text-dark rounded shadow" title="Last Updated" @click="getAllBugs()">
                Last Updated
              </button>
              <button class="btn-btn bg-primary text-dark rounded shadow" title="Priority Level" @click="order('priority')">
                Priority
              </button>
              <button class="btn-btn bg-success lighten-15 text-dark rounded" title="Open Bugs" @click="order('active')">
                Open Bugs
              </button>
              <button class="btn-btn bg-danger lighten-10 text-dark rounded shadow" title="Closed Bugs" @click="order('closed')">
                Closed Bugs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid p-3 pe-4">
    <div class="row card bg-primary lighten-20">
      <Bug v-for="bug in bug" :key="bug.id" :bug="bug" class="" />
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
import { computed, onMounted, ref } from '@vue/runtime-core'
import { bugsService } from '../services/BugsService.js'
import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'

export default {
  setup() {
    onMounted(() => {
      bugsService.getBugs()
    })
    return {
      bugs: computed(() => AppState.bugs),
      profile: computed(() => AppState.profile),
      sort: computed(() => AppState.sort),
      currentBug: computed(() => AppState.currentBug),
      bug: computed(() => AppState.bugs),
      togglePriority() {
      },

      order(status) {
        AppState.sort.order = status
      },

      async getAllBugs() {
        await bugsService.getBugs()
      }
    }
  }
}

</script>

<style scoped lang="scss">
.bugbtn{
  min-height: 40px;
}
</style>
