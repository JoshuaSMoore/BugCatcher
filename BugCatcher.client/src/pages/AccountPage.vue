<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div v-if="accountBugs">
    <div class="container">
      <div class="row">
        <AccountBug v-for="b in accountBugs" :key="b.id" :bug="b" class="col-6" />
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
