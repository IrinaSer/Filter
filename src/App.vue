<template>
  <div id="app">
    <app-filter></app-filter>
  </div>
</template>

<script>
import Filter from './components/MainFilter'

export default {
  name: 'app',
  components: {
    appFilter: Filter
  }
}
</script>

<style>

</style>
