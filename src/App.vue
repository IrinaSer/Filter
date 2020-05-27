<template>
  <div id="app">
    <app-filter></app-filter>
  </div>
</template>

<script>
import appFilter from "./components/MainFilter";

export default {
  name: "app",
  components: {
    appFilter,
  },
};
</script>
<style src="../public/css/style.css"></style>
