const state = {
    text: [],
    number: [],
}

const form = document.querySelector('#form-fields');
const result = document.querySelector('#result');

function clearValues() {
    state.text = [];
    state.number = [];
    result.innerHTML = "";
}

function createId() {
  return Math.random().toString(36).substr(2, 9)
}

function createFilterRow(close) {
    let fieldset = document.createElement('fieldset');
    fieldset.className = 'filter-item';
    let rowId = createId();
    fieldset.id = rowId;
    let row = document.createElement('div');
    row.className = 'grid-x';

    let selectField = document.createElement('select');
    selectField.setAttribute('name', 'field');
    selectField.className = 'medium-4 cell';
    select = createSelect(selectField, ['Text field', 'Number field'], ['text', 'num']);
    row.appendChild(select);

    selectField.addEventListener('change', e => {

        let curOpt = e.currentTarget;

        for (let i = 0; i < curOpt.options.length; i++) {
            let option = curOpt.options[i];
            let elem = getSiblings(curOpt, 'data-operation', option.value);
            let input = getSiblings(curOpt, 'data-val', option.value);

            if (option.selected) {
                elem.style.display = "inline-block";
                elem.disabled = false;
                input.style.display = "inline-block";
                input.disabled = false;
                input.value = "";
            } else {
                elem.style.display = "none";
                elem.selectedIndex = 0;
                elem.disabled = true;
                input.style.display = "none";
                input.selectedIndex = 0;
                input.disabled = true;
                input.value = "";
            }
        }
    });

    let selectText = document.createElement('select');
    selectText.setAttribute('name', 'text');
    selectText.setAttribute('data-operation', 'text');
    selectText.className = 'medium-4 cell';
    select = createSelect(selectText, ['Containing', 'Exactly matching', 'Begins with', 'Ends with'], ['containing', 'exactly matching', 'begins with', 'ends with']);
    row.appendChild(select);

    let selectNum = document.createElement('select');
    selectNum.setAttribute('name', 'num');
    selectNum.setAttribute('data-operation', 'num');
    selectNum.style.display = 'none';
    selectNum.setAttribute('disabled', '');
    selectNum.className = 'medium-4 cell';
    select = createSelect(selectNum, ['Equal', 'Greater than', 'Less than'], ['equal', 'greater than', 'less than']);
    row.appendChild(select);

    let input = document.createElement('input');
    input.setAttribute('name', 'text-value');
    input.setAttribute('type', 'text');
    input.setAttribute('data-val', 'text');
    input.className = 'medium-4 cell value';
    row.appendChild(input);

    let inputNum = document.createElement('input');
    inputNum.setAttribute('name', 'num-value');
    inputNum.setAttribute('type', 'number');
    inputNum.setAttribute('data-val', 'num');
    inputNum.className = 'medium-4 cell value';
    inputNum.style.display = 'none';
    inputNum.setAttribute('disabled', '');
    row.appendChild(inputNum);

    if (close) {
        let closeBtn = document.createElement('span');
        closeBtn.className = 'close';
        row.appendChild(closeBtn);
        fieldset.classList = 'filter-item item-close';

        closeBtn.addEventListener('click', e => {
            curRow = e.currentTarget.parentNode.closest('.filter-item');;
            form.removeChild(curRow);
        });
    }
    fieldset.appendChild(row);
    form.appendChild(fieldset);

}

function createSelect(select, text, options) {
    for (let i = 0; i < options.length; i++) {
        let newOption = new Option(text[i], options[i]);
        select.appendChild(newOption);
    }
    return select;
}

function serialize() {
  let row = document.querySelectorAll('.filter-item');
  for (let i = 0; i < row.length; i++) {
    let values = {
      type: '',
      operation: '',
      value: '',
    };
    for (let j = 0; j < row[i].elements.length; j++) {
      let field = row[i].elements[j];

      // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
      if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

      // Convert field data to a query string
      else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {

        switch (field.name) {
          case 'field':
            values.type = field.value;
            break;
          case 'text':
            values.operation = field.value;
            break;
          case 'num':
            values.operation = field.value;
            break;
          case 'text-value':
            values.value = field.value;
            break;
          case 'num-value':
            values.value = field.value;
            break;
        }
      }
    }
    if (values.type == "text") {
      delete values.type;
      state.text.push(values);
    }
    if (values.type == "num") {
      delete values.type;
      state.number.push(values);

    }
  }
    return state;
};

function getSiblings(elem, attr, val) {

    // Setup siblings array and get the first sibling
    let siblings;
    let sibling = elem.parentNode.firstChild;

    // Loop through each sibling and push to the array
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== elem) {
            let sibAttr = sibling.getAttribute(attr);

            if (sibAttr === val)
                siblings = sibling;
        }
        sibling = sibling.nextSibling;
    }

    return siblings;

};

let filter = {
    init() {
        createFilterRow();

        let apply = document.querySelector("#apply");
        apply.addEventListener('click', event => {
            event.preventDefault();
            clearValues();
            let formData = serialize();
            let res = JSON.stringify(formData, null, 4);
            console.log(res);
            result.innerHTML = res;
        });

        let add = document.querySelector("#add");
        add.addEventListener('click', event => {
            let counter = document.querySelector('#form-fields').childNodes.length;
            event.preventDefault();

            if (counter < 11) {
                createFilterRow(close);
            } else {
                return false;
            }
        });

        let clear = document.querySelector("#clear");
        clear.addEventListener('click', event => {
            event.preventDefault();

            clearRows = document.querySelectorAll('fieldset');
            for (let i = 0; i < clearRows.length; i++) {
              form.removeChild(clearRows[i]);
            }

            createFilterRow();

            clearValues();
        });
    }
}

window.onload = function () {
    filter.init();
}