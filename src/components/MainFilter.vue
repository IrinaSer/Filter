<template lang="pug">
  .grid-container
    .main-app
      app-row(
        v-for="row in filterRows"
        :key="row.id"
        :content="setup"
        :row="row"
        :count="filterRows.length")
      a(
        href="#"
        id="add"
        v-show="filterRows.length<10"
        @click="createFilterRow"
        class="add-condition"
        ) Add condition
      <hr>
      button.button(
        @click="pushToStore"
      ) Apply
      button.button.secondary(
        @click="clearFilter"
      ) Clear filter
      h4 Result:
      pre
        code {{ result }}
</template>

<script>
import Row from "../components/FilterRow.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    appRow: Row
  },
  computed: {
    ...mapGetters({
      filterRows: "rows",
      setup: "setup",
      result: "result"
    })
  },
  methods: {
    createFilterRow() {
      this.$store.commit("createFilterRow");
      this.$store.commit("clearResult");
    },
    pushToStore: function() {
      this.$store.commit("clearResult");

      for (let i in this.filterRows) {
        let filterItem = this.filterRows[i];
        let filterItemResult = {
          type: "",
          operation: "",
          value: ""
        };

        filterItemResult.operation = filterItem.selectOperation;
        filterItemResult.value = filterItem.inputValue;
        filterItemResult.type = filterItem.selectType;

        this.$store.commit("updateResult", filterItemResult);
      }
    },
    clearFilter: function() {
      this.$store.commit("clearFilter");
      this.createFilterRow();
    }
  },
  created: function() {
    this.createFilterRow();
  }
};
</script>
