<template>
  <div class="about text-center text-dark">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded-circle" style="height: 75px" :src="account.picture" alt="" />
    <h6 class="text-primary">
      {{ account.email }}
    </h6>
  </div>
  <br>
  <div class="card-header track text-center text-secondary">
    <h2>
      <span class="badge bg-secondary text-warning">Tracked Bugs</span>
    </h2>
  </div>
  <div v-if="accountBugs">
    <div class="container">
      <div class="row">
        <AccountBug v-for="b in accountBugs" :key="b.id" :bug="b" class="col-12" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService.js'
import Pop from '../utils/Pop.js'

export default {
  name: 'Account',
  setup() {
    onMounted(async() => {
      try {
        await accountService.getTrackedBugs()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      account: computed(() => AppState.account),
      accountBugs: computed(() => AppState.accountBugs)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

</style>
