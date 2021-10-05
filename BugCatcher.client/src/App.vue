<template>
  <header>
    <Navbar />
  </header>
  <main class="main-back">
    <router-view />
  </main>
  <footer>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.main-back{
overflow-x: hidden;
background-image: url(https://previews.123rf.com/images/arcady31/arcady311908/arcady31190800008/130165416-circuit-bug-vector-icon-isolated-on-white-background.jpg);
background-position: center;
}
</style>
