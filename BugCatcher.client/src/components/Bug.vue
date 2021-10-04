
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
              <div class="text-success mt-3" v-if="bug.priority <=3">
                <small>
                  Priority Level:  {{ bug.priority }}
                </small>
              </div>
              <div class="text-warning mt-3" v-if="bug.priority == 4">
                <small>
                  Priority Level:  {{ bug.priority }}
                </small>
              </div>
              <div class="text-danger mt-3" v-if="bug.priority == 5">
                <small>
                  Priority Level:  {{ bug.priority }}
                </small>
              </div>
              <br>
              <small>
                Last Update:<br> {{ new Date(bug.updatedAt).toLocaleString('en', date) }}
              </small>
            </h5>
            <div class="div">
              <small> Details: </small> <br>
              <h4>
                {{ bug.description }}
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
