
<template>
  <div class="col-md-12 elevation-5 m-3 shadow-lg">
    <div class="card stylecard elevation-5 text-start p-3   shadow-lg">
      <!-- <div class="on-hover text-end" style="right: 1rem; top: 1rem" v-if="account.id == project.creatorId">
          <i class="mdi mdi-delete text-danger f-20 selectable" @click="deleteBug()"></i>
        </div> -->
      <div class="d-flex justify-content-between">
        <h5 class="">
          <router-link :to="{name: 'BugDetails', params: {bugId: bug.id }}" :title="bug.title">
            {{ bug.title }}
          </router-link>
          <br> Priority Level:  {{ bug.priority }}
        </h5>
        <h4>
          {{ bug.description }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import { Bug } from '../Models/Bug.js'
export default {
  props: {
    bug: { type: Bug, required: true }
  },
  setup(props) {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.bug-card{
  min-height: 6rem;
  min-width: 80vw;
}
</style>
