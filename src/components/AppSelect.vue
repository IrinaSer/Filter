<template lang="pug">
  select(
      :name="name"
      class="medium-4 cell"
      :value="value"
      @change="$emit('change', $event.target.value)"
      )
      option(
          v-for="(field,i) in options"
          :value="field.value ? field.value : field"
          :key="i"
      ) {{ field.name ? field.name : field }}
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "change",
  },
  props: ["name", "options", "value"],
};
</script>
