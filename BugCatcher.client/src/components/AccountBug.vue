
<template>
  <div class="card stylecard elevation-5 text-start p-3   shadow-lg bg-secondary lighten-5 ">
    <div class="d-flex justify-content-between">
      <div class="">
        <router-link submit.prevent :to="{name: 'BugDetails', params: {bugId: bug.bugId.id }}" :title="bug.bugId.title">
          <h4 class="text-info">
            {{ bug.bugId.title }}
          </h4>
        </router-link>
        <div class="text-success mt-3" v-if="bug.bugId.priority <=3">
          <h6>
            Priority Level:  {{ bug.bugId.priority }}
          </h6>
        </div>
        <div class="text-warning mt-3" v-if="bug.priority == 4">
          <h6>
            Priority Level:  {{ bug.bugId.priority }}
          </h6>
        </div>
        <div class="text-danger mt-3" v-if="bug.priority == 5">
          <h6>
            Priority Level:  {{ bug.bugId.priority }}
          </h6>
        </div>
      </div>
      <div class="div text-center">
        <small> Details: </small>
        <h4>
          {{ bug.bugId.description }}
        </h4>
      </div>
      <div v-if="!bug.bugId.closed == true">
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
</template>
<script>
export default {
  props: {
    bug: { type: Object, required: true }
  },
  setup(props) {
    return {}
  }
}
</script>
