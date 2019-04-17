<template>
  <div
          class="grid-x"
          :id="content.id">
    <select
            name="field-type"
            class="medium-4 cell"
            v-model="content.selectType"
            @change="changeValue">
      <option
              v-for="(field,i) in content.fieldsType"
              :value="field.value"
              :key="i"
      >{{ field.name }}
      </option>
    </select>
    <select
            name="text"
            class="medium-4 cell"
            v-model="content.selectOperation"
            v-show="content.selectType === 'text'">
      <option
              v-for="(field,i) in content.textSelect"
              :value="field"
              :key="i"
      >{{ field }}
      </option>
    </select>
    <select
            name="number"
            class="medium-4 cell"
            v-model="content.selectOperation"
            v-show="content.selectType === 'number'">
      <option
              v-for="(field,i) in content.numberSelect"
              :value="field"
              :key="i"
      >{{ field }}
      </option>
    </select>
    <input
            name="text-value"
            type="text"
            data-val="text"
            class="medium-4 cell"
            v-model="content.inputValue"
            v-show="content.selectType === 'text'">
    <input
            name="number-value"
            type="number"
            data-val="num"
            class="medium-4 cell"
            v-model="content.inputValue"
            v-show="content.selectType === 'number'">
    <span
            class="close"
            v-show="count>1"
            @click="deleteFilterRow"></span>
  </div>
</template>

<script>
  export default {
    props: ['content', 'count'],
    computed: {
      textSelect() {
        return this.$store.getters.textValue
      },
      numberSelect() {
        return this.$store.getters.numberValue
      }
    },
    methods: {
      changeValue: function () {
        if (this.content.selectType == 'number') {
          this.content.selectOperation = this.numberSelect
        } else {
          this.content.selectOperation = this.textSelect
        }
        this.content.inputValue = '';
      },
      deleteFilterRow: function () {
        this.$store.commit('deleteFilterRow', this.content.id)
      }
    }
  }
</script>

<style scoped>

</style>