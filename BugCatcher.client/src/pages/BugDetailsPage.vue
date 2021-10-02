<template>
  <div class="BugDetailsPage container-fluid">
    <div class="row my-5 align-content-center" v-if="currentBug.id">
      <div class="col-12 d-flex justify-content-center">
        <div class="d-flex shadow p-2">
          <h1 class="my-auto">
            Active Bug Details
          </h1>
        </div>
      </div>
    </div>
    <div class="row justify-content-center rounded">
      <div class="col-6 bg-light p-2 shadow rounded">
        <div class="row">
          <div class="col-12 d-flex justify-content-between">
            <div class="d-flex">
              <i :class="{'text-danger': currentBug.closed}" class="fa fa-circle fa-2x text-success" aria-hidden="true"></i>
              <h3 class="my-auto pl-4 pb-4">
                {{ currentBug.title }}
              </h3>
            </div>
            <div class="d-flex">
              <button class="btn" v-if="!currentBug.closed" @click="editBug(currentBug.id, currentBug)">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="row text-left">
          <div class="col-12 ">
            <p>
              {{ currentBug.description }}
            </p>
            <!-- <p class="mr-5">
              Submitted by:<img :src="currentBug.creator.picture" class="rounded-circle" height="25" alt="">{{ currentBug.creator.email }}
            </p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { bugsService } from '../services/BugsService.js'
import { AppState } from '../AppState.js'
import Pop from '../utils/Pop.js'
import { Bug } from '../Models/Bug.js'
export default {
  props: {
    bug: { type: Bug, required: true }
  },
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await bugsService.getBugById(route.params.bugId)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      route,
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
      currentBug: computed(() => AppState.currentBug),
      bugs: computed(() => AppState.bugs)

      // editBug(bugId) {
      //   bugsService.editBug(bugId)
      // }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
