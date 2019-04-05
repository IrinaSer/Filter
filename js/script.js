const state = {
    text: [],
    number: [],
}

function clearValues() {
    state.text = [];
    state.number = [];
}

function createFilterRow(close) {
    let form = document.querySelector('#form-fields');
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
    input.className = 'medium-4 cell';
    row.appendChild(input);

    let inputNum = document.createElement('input');
    inputNum.setAttribute('name', 'num-value');
    inputNum.setAttribute('type', 'number');
    inputNum.setAttribute('data-val', 'num');
    inputNum.className = 'medium-4 cell';
    inputNum.style.display = 'none';
    inputNum.setAttribute('disabled', '');
    row.appendChild(inputNum);

    if (close) {
        let closeBtn = document.createElement('span');
        closeBtn.className = 'close';
        row.appendChild(closeBtn);

        closeBtn.addEventListener('click', e => {
            curRow = e.currentTarget.parentNode;
            form.removeChild(curRow);
        });
    }

    form.appendChild(row);

}

function createSelect(select, text, options) {
    for (let i = 0; i < options.length; i++) {
        let newOption = new Option(text[i], options[i]);
        select.appendChild(newOption);
    }
    return select;
}

function serialize(form) {
    clearValues();
    // Setup our serialized data
    let serialized = [];
    let values = {
        operation: '',
        value: '',
    };
    let row = 0;

    // Loop through each field in the form
    for (let i = 0; i < form.elements.length; i++) {

        let field = form.elements[i];

        // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
        if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;


        // Convert field data to a query string
        else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {

            serialized.push("[" + encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value) + "]");

            if (field.name == 'field') {
                if (field.value == 'text') {
                    state.text.push(values);
                    values.operation = '';
                    values.value = '';
                }

                if (field.value == 'num') {
                    state.number.push(values);
                    values.operation = '';
                    values.value = '';
                }
            }

            switch (field.name) {
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
            row++;
        }
    }

    return state;//serialized.join(',');

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
        let form = document.forms.filter;

        createFilterRow();

        let apply = document.querySelector("#apply");
        apply.addEventListener('click', event => {
            event.preventDefault();
            let formData = serialize(form);
            let res = JSON.stringify(formData, null, 4);
            console.log(res);
        });

        let add = document.querySelector("#add");
        add.addEventListener('click', event => {
            let counter = document.querySelector('#form-fields').childNodes.length;
            event.preventDefault();
            if (counter <= 10) {
                createFilterRow(close);
            } else {
                return false;
            }
        });

        let clear = document.querySelector("#clear");
        clear.addEventListener('click', event => {
            event.preventDefault();
            document.querySelector('#form-fields').innerHTML = "";
            createFilterRow();
            clearValues();
        });
    }
}

window.onload = function () {
    filter.init();
}
/**/
var app = new Vue({
    el: '#app',
    data: {
        message: 'Привет, Vue!'
    }
});
