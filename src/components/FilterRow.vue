<template lang="pug">
  .grid-x(:id="row.id")
    select(
      name="field-type"
      class="medium-4 cell"
      v-model="row.selectType"
      @change="changeValue")
      option(
        v-for="(field,i) in content.fieldsType"
        :value="field.value"
        :key="i"
      ) {{ field.name }}
    select(
      name="text"
      class="medium-4 cell"
      v-model="row.selectOperation"
      v-show="row.selectType === 'text'")
      option(
        v-for="(field,i) in content.textSelect"
        :value="field"
        :key="i"
      ) {{ field }}
    select(
      name="number"
      class="medium-4 cell"
      v-model="row.selectOperation"
      v-show="row.selectType === 'number'")
      option(
        v-for="(field,i) in content.numberSelect"
        :value="field"
        :key="i"
      ) {{ field }}
    input(
      name="text-value"
      type="text"
      data-val="text"
      class="medium-4 cell"
      v-model="row.inputValue"
      v-show="row.selectType === 'text'")
    input(
      name="number-value"
      type="number"
      data-val="num"
      class="medium-4 cell"
      v-model="row.inputValue"
      v-show="row.selectType === 'number'")
    span.close(
      v-show="count>1"
      @click="deleteFilterRow")
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["content", "count", "row"],
  computed: {
    ...mapGetters({
      textSelect: "textValue",
      numberSelect: "numberValue",
    }),
  },
  methods: {
    changeValue: function() {
      this.row.selectType == "number"
        ? (this.row.selectOperation = this.numberSelect)
        : (this.row.selectOperation = this.textSelect);
      this.row.inputValue = "";
    },
    deleteFilterRow: function() {
      this.$store.commit("deleteFilterRow", this.row.id);
    },
  },
};
</script>
