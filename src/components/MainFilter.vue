<template>
  <div class="grid-container">
    <div class="main-app">
      <app-row
              v-for="row in filterRows"
              :key="row.id"
              :content="setup"
              :row="row"
              :count="filterRows.length"
      ></app-row>
      <a
              href="#"
              id="add"
              v-show="filterRows.length<10"
              @click="createFilterRow"
              class="add-condition">Add condition</a>
      <hr>
      <button
              class="button"
              @click="pushToStore"
      >Apply
      </button>
      <button
              class="button secondary"
              @click="clearFilter"
      >Clear filter
      </button>
      <h4>Result: </h4>
      <pre>
          {{ result }}
        </pre>
    </div>
  </div>
</template>

<script>
  import Row from '../components/FilterRow.vue'

  export default {
    components: {
      appRow: Row
    },
    computed: {
      filterRows() {
        return this.$store.getters.rows
      },
      setup() {
        return this.$store.getters.setup
      },
      result() {
        return this.$store.getters.result
      }
    },
    methods: {
      createFilterRow() {
        this.$store.commit('createFilterRow')
        this.$store.commit('clearResult')
      },
      pushToStore: function () {
        this.$store.commit('clearResult')

        for (let i in this.filterRows) {
          let filterItem = this.filterRows[i];
          let filterItemResult = {
            type: '',
            operation: '',
            value: ''
          };

          filterItemResult.operation = filterItem.selectOperation;
          filterItemResult.value = filterItem.inputValue;
          filterItemResult.type = filterItem.selectType;

          this.$store.commit('updateResult', filterItemResult)
        }
      },
      clearFilter: function () {
        this.$store.commit('clearFilter')
        this.createFilterRow()
      }
    },
    created: function () {
      this.createFilterRow()
    }
  }
</script>

<style scoped>

</style>