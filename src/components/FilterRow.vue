<template lang="pug">
  div
    .grid-x(:id="row.id")
      app-select(
        name="field-type"
        v-model="row.selectType"
        :options="content.fieldsType"
        v-on:change.native="changeValue"
        )
      app-select(
        name="text"
        v-model="row.selectOperation"
        :options="content.textSelect"
        v-show="row.selectType === 'text'"
        )
      app-select(
        name="number"
        v-model="row.selectOperation"
        :options="content.numberSelect"
        v-show="row.selectType === 'number'"
        )
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
import appSelect from "./AppSelect";

export default {
  props: ["content", "count", "row"],
  components: {
    appSelect,
  },
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
