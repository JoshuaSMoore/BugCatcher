<template>
  <form @submit.prevent="createBug()">
    <div class="form-group">
      <label for="title">Name</label>
      <input type="text"
             class="form-control bg-light"
             name="title"
             placeholder="Bug Name"
             v-model="editable.title"
             required
      >
    </div>
    <div class="form-group">
      <label for="body">Description</label>
      <input type="text"
             class="form-control bg-light"
             name="body"
             placeholder="Description"
             v-model="editable.description"
             required
      >
      <label for="priority" class="">Priority Level:</label>
      <select
        v-model="editable.priority"
        name="priority"
        id="priority"
        required
        class="form-control"
      >
        <option disabled selected value="">
          Priority Level
        </option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
    </div>
    <div class="form-group">
      <div class="d-flex justify-content-between my-3">
        <button type="button" data-bs-dismiss="modal" aria-label="Close" class="btn text-dark lighten-20 text-uppercase selectable">
          <b>
            Cancel
          </b>
          <button type="submit" title="Submit" class="btn btn-success mt-2">
            Create
          </button>
        </button>
      </div>
    </div>
  </form>
</template>
<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop'
import { Modal } from 'bootstrap'
import { logger } from '../utils/Logger.js'
import { bugsService } from '../services/BugsService.js'
import { Bug } from '../Models/Bug.js'
import { watchEffect } from '@vue/runtime-core'

export default {
  props: {
    bug: { type: Bug, default: () => new Bug() }
  },
  setup(props) {
    const editable = ref({})
    watchEffect(() => {
      editable.value = { ...props.bug }
    })
    return {
      editable,
      async createBug() {
        try {
          Pop.toast('Bug Added', 'success')
          await bugsService.createBug(editable.value)
          const modal = Modal.getInstance(document.getElementById('bug-form'))
          modal.hide()
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log(error)
        }
      }
    }
  }
}
</script>
