const store = {};
const bus = new Vue();

let fieldsType = [{name: 'Text field', value: 'text'}, {name: 'Number field', value: 'number'}];
let textSelect = ['Containing', 'Exactly matching', 'Begins with', 'Ends with'];
let numberSelect = ['Equal', 'Greater than', 'Less than'];
let filterRow;
let id = () => {
    return Math.random().toString(36).substr(2, 9)
};

Vue.component('filter-row', {
    props: ['content','count'],
    template: `
    <div class="grid-x" :id="content.id">
        <select name="field-type" class="medium-4 cell" v-model="content.selectType" @change="changeValue">
            <option v-for="(field,i) in content.fieldsType" :value="field.value">{{ field.name }}</option>
        </select>
        <select name="text" class="medium-4 cell" v-model="content.selectOperation" v-show="content.selectType === 'text'">
            <option v-for="(field,i) in content.textSelect" :value="field" >{{ field }}</option>
        </select>
        <select name="number" class="medium-4 cell" v-model="content.selectOperation" v-show="content.selectType === 'number'">
            <option v-for="(field,i) in content.numberSelect" :value="field">{{ field }}</option>
        </select>
        <input name="text-value" type="text" data-val="text" class="medium-4 cell" v-model="content.inputValue" v-show="content.selectType === 'text'">
        <input name="number-value" type="number" data-val="num" class="medium-4 cell" v-model="content.inputValue" v-show="content.selectType === 'number'">
    </div>
  `,
    methods: {
        changeValue: function () {
            if (this.content.selectType == 'number') {
                this.content.selectOperation = numberSelect[0];
            } else {
                this.content.selectOperation = textSelect[0];
            }
            this.content.inputValue = '';
        }
    }
});


class FilterRow {
    constructor (fieldsType, textSelect, numberSelect, selectType, selectOperation, inputValue, id = null) {
        this.fieldsType = fieldsType
        this.textSelect = textSelect
        this.numberSelect = numberSelect
        this.selectType = selectType
        this.selectOperation = selectOperation
        this.inputValue = inputValue
        this.id = id
    }
}
var app = new Vue({
    el: '#app',
    data: {
        filterRows : [],
        store: store
    },
    methods: {
        pushToStore: function () {
            let type = '';
            this.store = {
                text: [],
                number: []
            };
            for (let i in this.filterRows) {
                let filterItem = this.filterRows[i];
                let result = {
                    type: '',
                    operation: '',
                    value: ''
                };
               for (let key in filterItem) {
                    result.type = filterItem.selectType;
                    result.operation = filterItem.selectOperation;
                    result.value = filterItem.inputValue;
                }
                type = result.type;
                delete result.type;
                this.store[type].push(result);
            }

            let res = JSON.stringify(this.store, null, 4);
            console.log(res);
        },
        createFilterRow: function () {
            filterRow = new FilterRow (fieldsType, textSelect, numberSelect, 'text', 'Containing', '', id());
            this.filterRows.push(filterRow);
        },
        clearFilter: function () {
            let filterCount = this.filterRows.length;

            if (filterCount > 1) {
                let arr = this.filterRows.splice(1,1);
                this.filterRows = arr;
            }
            this.filterRows[0].selectType = 'text';
            this.filterRows[0].selectOperation = textSelect[0];
            this.filterRows[0].inputValue = '';
            this.store = {};
        }
    },
    created: function () {
        this.createFilterRow();
    }
});
