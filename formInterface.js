

var form1 = formBuilder;

var list = [
    'Moo123'
];

form1.addParent('form_wrapper').addSettings().addInput({label:'this is a label'}).addSelect(list);

var form2 =  formBuilder;

var list = [
    'Do',
    'Ah',
    "Dear"
];

form1.addInput().addSelect(list);

function addInput() {

  var data = {
    name: '',
    value: '',
    class: '',
    label: ''
  };

  form2.addInput(data);

}

function addSelect() {

  var data = {
    name: '',
    value: '',
    class: '',
    label: ''
  };

  form2.addSelect();

}
