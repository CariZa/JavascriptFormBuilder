//VERSION 0.01
//Added in the basic concept

var moo = 'moo';
var baa = 'baa';

var valid_types = [
    'input'
];

var form_fields = [
    	{
            type : 'input',
            attributes : {
                name: 'Name',
                value: 'Insert a name'
            }
        },{
            type : 'input',
            attributes : {
                name: 'Surname',
                value: 'Insert a surname'
            }
        }
    ];



function DOMManipulator() {

  var api = {};

  api.createElement = function(type) {
      return document.createElement(type);
  };

  api.getElementById = function(id) {
      return document.getElementById(id);
  };

  api.appendChild = function(element, addTo) {
      addTo.appendChild(element);
  };

  api.appendChildren = function(list, addTo) {
      for(var i = 0; i < list.length; i++){
          api.appendChild(list[i], addTo);
      }
  }

  return api;

};



function DOMCreator(DOMManipulator) {

  var api = {};

  api.validType = function(type) {
      return valid_types.indexOf(type) < 0;
  };

  api.buildAttributes = function(element, list) {
    for (var j = 0; j < Object.keys(list).length; j++) {
        var attribute = Object.keys(list)[j];
        var value = list[attribute];
        element.setAttribute(attribute, value);
    }
    return element;
  };

  api.buildElements = function(list) {
      var elements = [];
      for (var i = 0; i < list.length; i++) {
          var field = list[i];
          //Validation hack, refactor when have time
          if (api.validType(field.type)) continue;
          var element = DOMManipulator().createElement(field.type);
          if (field.attributes) {
              element = api.buildAttributes(element, field.attributes);
          }
          elements.push(element);
      }
      return elements;
  };

  return api;

};



function FormCreator() {

  var api = {};

  api.start = function(list, id) {
        var container = DOMManipulator().getElementById(id);
        var formElements = DOMCreator(DOMManipulator).buildElements(list, container);
        DOMManipulator().appendChildren(formElements, container);
  };

  return api;

};

FormCreator().start(form_fields, 'form_wrapper');

FormCreator().start([{type:'input'}], 'form_wrapper');

FormCreator().start([{type: 'invalidtype'}], 'form_wrapper');
