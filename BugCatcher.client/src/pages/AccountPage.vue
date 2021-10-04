<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="col-md-12 elevation-5 m-2 ms-2 pe-4 shadow-lg rounded bg-primary">
    <div class="">
      <div class="card stylecard elevation-5 text-start p-3   shadow-lg bg-secondary lighten-5 ">
        <div class="d-flex justify-content-between">
          <div class="">
            <!-- <router-link submit.prevent :to="{name: 'BugDetails', params: {bugId: bug.id }}" :title="bug.title">
              <h4 class="text-info">
                {{ bug.title }}
              </h4>
            </router-link> -->
            <div class="text-success mt-3" v-if="bug.priority <=3">
              <h6>
                Priority Level:  {{ bug.bug.priority }}
              </h6>
            </div>
            <div class="text-warning mt-3" v-if="bug.bug.priority == 4">
              <h6>
                Priority Level:  {{ bug.bug.priority }}
              </h6>
            </div>
            <div class="text-danger mt-3" v-if="bug.bug.priority == 5">
              <h6>
                Priority Level:  {{ bug.bug.priority }}
              </h6>
            </div>
            <br>
            <small>
              Last Update:<br> {{ new Date(bug.bug.updatedAt).toLocaleString('en') }}
            </small>
          </div>
          <div class="div text-center">
            <small> Details: </small>
            <h4>
              {{ bug.bug.description }}
            </h4>
          </div>
          <div v-if="!bug.closed == true">
            Status
            <br>
            <i class="mdi mdi-circle mdi-48px text-success"></i>
            <!-- <span> {{ bug.closed }}</span> -->
          </div>
          <div v-else>
            Status
            <br>
            <i class="mdi mdi-circle mdi-48px text-danger"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService.js'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop.js'

export default {
  name: 'Account',
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await accountService.getTrackedBugs(route.params.accountId)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      route,
      account: computed(() => AppState.account),
      trackedbugs: computed(() => AppState.trackedbugs),
      bugs: computed(() => AppState.trackedbugs)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
