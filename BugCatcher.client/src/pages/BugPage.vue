<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="home flex-grow-1 d-flex flex-column align-items-end justify-content-end">
          <button class="btn-btn bg-primary text-light selectable mt-3" data-bs-toggle="modal" data-bs-target="#bug-form">
            Add a Bug
          </button>
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
      bugs: computed(() => AppState.bugs)
    }
  }
}

</script>

<style scoped lang="scss">
</style>
