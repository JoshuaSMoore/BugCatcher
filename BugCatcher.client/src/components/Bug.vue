
<template>
  <div class="bugpage" v-if="(sort.order == 'closed' && bug.closed) || (sort.order == 'active' && !bug.closed) || (sort.order == 'priority' && bugs.sort((a, b) => { return b.priority - a.priority })) || (sort.order == 'all')">
    <div class="col-md-12 elevation-5 m-2 ms-2 pe-4 shadow-lg rounded bg-primary">
      <div class="">
        <div class="card stylecard elevation-5 text-start p-3   shadow-lg bg-secondary lighten-5 ">
          <div class="d-flex justify-content-between">
            <div class="">
              <router-link submit.prevent :to="{name: 'BugDetails', params: {bugId: bug.id }}" :title="bug.title">
                <h4 class="text-info">
                  {{ bug.title }}
                </h4>
              </router-link>
              <div class="text-success mt-3" v-if="bug.priority <=3">
                <h6>
                  Priority Level:  {{ bug.priority }}
                </h6>
              </div>
              <div class="text-warning mt-3" v-if="bug.priority == 4">
                <h6>
                  Priority Level:  {{ bug.priority }}
                </h6>
              </div>
              <div class="text-danger mt-3" v-if="bug.priority == 5">
                <h6>
                  Priority Level:  {{ bug.priority }}
                </h6>
              </div>
              <br>
              <small>
                Last Update:<br> {{ new Date(bug.updatedAt).toLocaleString('en') }}
              </small>
            </div>
            <div class="div text-center">
              <small> Details: </small>
              <h4>
                {{ bug.description }}
              </h4>
            </div>
            <div v-if="!bug.closed == true">
              Status
              <br>
              <i class="mdi mdi-circle mdi-48px text-success"></i>
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
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState.js'

export default {
  props: {
    bug: { type: Object, required: true }
  },
  setup(props) {
    return {
      sort: computed(() => AppState.sort),
      bugs: computed(() => AppState.bugs)

    }
  }
}
</script>

<style lang="scss" scoped>
.bug-card{
  min-height: 6rem;
  min-width: 80vw;
}
</style>
