function createFilterRow() {
    let row = document.createElement('div');
    row.className = 'grid-x';

    let selectField = document.createElement('select');
    selectField.setAttribute('name', 'field');
    selectField.className = 'medium-4 cell';
    select = createSelect(selectField, ['Text field', 'Number field'], ['text', 'num']);
    row.appendChild(select);

    selectField.addEventListener('change', e => {
        console.log('click!');
        let curOpt = e.currentTarget;

        for (let i = 0; i < curOpt.options.length; i++) {
            let option = curOpt.options[i];
            let elem = getSiblings(curOpt, 'data-operation',option.value);

            if (option.selected) {
                elem.style.display = "inline-block";
                elem.disabled = false;
            } else {
                elem.style.display = "none";
                elem.selectedIndex = 0;
                elem.disabled = true;
            }
            getSiblings(curOpt, 'id','value').value = "";
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
    input.setAttribute('name', 'value');
    input.setAttribute('id', 'value');
    input.setAttribute('type', 'text');
    input.className = 'medium-3 cell';
    row.appendChild(input);

    document.querySelector('#form-fields').appendChild(row);

}

function createSelect(select, text, options) {
    for (let i = 0; i < options.length; i++) {
        let newOption = new Option(text[i], options[i]);
        select.appendChild(newOption);
    }
    return select;
}

function serialize(form) {

    // Setup our serialized data
    let serialized = [];

    // Loop through each field in the form
    for (let i = 0; i < form.elements.length; i++) {

        let field = form.elements[i];

        // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
        if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

        // If a multi-select, get all selections
        if (field.type === 'select-multiple') {
            for (let n = 0; n < field.options.length; n++) {
                if (!field.options[n].selected) continue;
                serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
            }
        }

        // Convert field data to a query string
        else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
            serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
        }
    }

    return serialized.join('&');

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
            console.log(formData);
        });

        let add = document.querySelector("#add");
        add.addEventListener('click', event => {
            event.preventDefault();
            createFilterRow();
        });

        let clear = document.querySelector("#clear");
        clear.addEventListener('click', event => {
            event.preventDefault();
            document.querySelector('#form-fields').innerHTML = "";
            createFilterRow();
        });
    }
}