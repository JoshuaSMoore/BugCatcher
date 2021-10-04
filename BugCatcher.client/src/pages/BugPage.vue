<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3">
        <div class="div pt-2 ps-2 d-flex justify-content-start">
          <button class="btn-btn bg-primary rounded shadow text-light bugbtn" data-bs-toggle="modal" data-bs-target="#bug-form">
            Add a Bug
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
              <button class="btn-btn bg-dark text-light rounded shadow" @click="order('all')">
                Last Updated
              </button>
              <button class="btn-btn bg-dark text-light rounded shadow" @click="togglePriority">
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
    </div>
  </div>
  <div class="container-fluid p-3 pe-4">
    <div class="row card bg-primary lighten-20">
      <Bug v-for="bug in bugs" :key="bug.id" :bug="bug" class="" />
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
    const prioFilter = ref(true)

    function prioFilterFunction(a, b) {
      if (prioFilter.value) {
        return b.priority - a.priority
      }
      return a.priority - b.priority
    }
    onMounted(() => {
      bugsService.getBugs()
    })
    return {
      prioFilter,
      bugs: computed(() => AppState.bugs),
      profile: computed(() => AppState.profile),
      sort: computed(() => AppState.sort),
      currentBug: computed(() => AppState.currentBug),
      bug: computed(() => AppState.bugs.filter(prioFilterFunction)),
      togglePriority() {
        prioFilter.value = !prioFilter.value
        logger.log(prioFilter)
      },

      order(status) {
        AppState.sort.order = status
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
