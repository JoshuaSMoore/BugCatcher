
<template>
  <div class="bugpage" v-if="(sort.order == 'closed' && bug.closed) || (sort.order == 'active' && !bug.closed) || (sort.order == 'all' && bug.priority) || (sort.order == 'update' && bug.updatedAt)">
    <div class="col-md-12 elevation-5 m-3 shadow-lg">
      <div class="bugcard ">
        <div class="card stylecard elevation-5 text-start p-3   shadow-lg">
          <!-- <div class="on-hover text-end" style="right: 1rem; top: 1rem" v-if="account.id == project.creatorId">
          <i class="mdi mdi-delete text-danger f-20 selectable" @click="deleteBug()"></i>
        </div> -->
          <div class="d-flex justify-content-between">
            <!-- <div class="">
              <i :class="{'text-danger': bug.closed}" class="fa fa-circle fa-2x text-success my-auto" aria-hidden="true"></i>
            </div> -->
            <h5 class="">
              <router-link :to="{name: 'BugDetails', params: {bugId: bug.id }}" :title="bug.title">
                {{ bug.title }}
              </router-link>
              <br> Priority Level:  {{ bug.priority }}
              <br>
              <small>
                Last Update: {{ bug.updatedAt.split('T').splice(0,1).join('') }}
              </small>
            </h5>
            <h4>
              {{ bug.description }}
            </h4>
            <!-- <h4 v-if="bug.closed == true">
              {{ status }}
            </h4> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { Bug } from '../Models/Bug.js'
import { AppState } from '../AppState.js'

export default {
  props: {
    bug: { type: Bug, required: true }
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
