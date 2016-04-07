//VERSION 0.01
//Added in the basic concept

var formBuilder = (function() {

    var instance;

    var form_fields = [];

    var settings = {
      'divClass' : "form-group",
      'inputClass' : "form-control",
      'selectClass' : "form-control"
    };

    var valid_types = [
        'input',
        'select',
        'option'
    ];

    this.dom = (function () {

      var api = {};

      api.clear = function(id) {
        var element = api.getElementById(id);
        element.innerHTML = '';
      };

      api.createInput = function(data) {
        return document.createElement('input');
      };

      api.wrapFormElements = function(list) {
        var elements = [];
        for(var i = 0; i < list.length; i++){
            var div = document.createElement('div');
            div.setAttribute("class", settings.divClass);
            div.appendChild(list[i]);
            elements.push(div);
        }
        return elements;
      };

      api.createSelect = function(data) {
        var select = document.createElement('select');
        if (data.options) {
          var options = api.buildElements(data.options);
          api.appendChildren(options, select);
        }
        return select;
      };

      api.createOption = function(data) {
        return document.createElement('option');
      };

      api.createLabel = function(value) {
        var label = document.createElement('label');
        label.innerText = value;
        return label;
      }

      api.fetchElement = function(data) {
          var createTypes = {
              'input' : api.createInput,
              'select' : api.createSelect,
              'option' : api.createOption
          };

          if (createTypes[data.type]) {
              return createTypes[data.type](data);
          }
      };

      api.getElementById = function(id) {
          return document.getElementById(id);
      };

      api.appendChildren = function(list, addTo) {
          for(var i = 0; i < list.length; i++){
              addTo.appendChild(list[i]);
          }
      };

      api.invalidType = function(type) {
          return valid_types.indexOf(type) < 0;
      };

      api.buildElements = function(list) {
          var elements = [];
          for (var i = 0; i < list.length; i++) {
              if (list[i].label) {
                elements.push(api.createLabel(list[i].label));
              }
              elements.push(api.buildElement(list[i]));
          }
          return elements;
      };

      api.buildAttributes = function(element, list) {
        for (var j = 0; j < Object.keys(list).length; j++) {
            var attribute = Object.keys(list)[j];
            var value = list[attribute];
            element.setAttribute(attribute, value);
        }
        return element;
      };

      api.buildElement = function(data, type) {
          //Validation hack, refactor when have time

          if (api.invalidType(data.type)) return;

          var element = api.fetchElement(data);
          if (data.attributes) {
              element = api.buildAttributes(element, data.attributes);
          }
          if (data.text) {
              element.innerHTML = data.text;
          }
          return element;

      };

      api.create = function(list, id) {
            //var container = DOMManipulator().getElementById(id);
            var formElements = dom.buildElements(list);
            dom.clear(id);
            var element = dom.getElementById(id)
            var elements = dom.wrapFormElements(formElements);
            dom.appendChildren(elements, element);
      };

      return api;

    })();




    this.configureSelectOptions = (function() {

      var api = {};

      api.alterObject = function(data) {
          if (data.value) {
            data.attributes = data.attributes || {};
            data.attributes.value = data.value;
          }
          data.type = 'option';
          return data;
      };

      api.alterString = function(text) {
          var data = {text: text};
          data.type = 'option';
          return data;
      };

      api.actions = function(data) {
          var type = typeof data;
          var types = {
              'Object' : api.alterObject,
              'string' : api.alterString
          };
          if (types[type]) {
            return types[type](data);
          }
      };

      api.createOptions = function(list) {
          var list = list || [];
          for(var i = 0; i < list.length; i++) {
            list[i] = api.actions(list[i]);
          }
          return list;
      };

      return api;

    })();

    var Add = (function() {

        var api = {};
        var configOpt = this.configureSelectOptions;

        api.addInput = function(data) {
          var data = data || {};
          form_fields.push({
              type : 'input',
              attributes : {
                  name: data.name || '',
                  value: data.value || '',
                  class: data.class || settings.inputClass,
                  placeholder : data.placeholder || ''
              },
              label: data.label || false
            });
        };

        api.addSelect = function(list, data) {
          var data = data || {};
          form_fields.push({
              type: 'select',
              attributes : {
                name : 'Name',
                selected : '',
                class: data.class || settings.selectClass
              },
              label: data.label || false,
              options : configOpt.createOptions(list)
          });
        };

        return api;

    })();



    var Controls = function (dom) {

      var dom = dom;

      return {
                init : function() {
                  dom.create(form_fields, settings.parent);
                  return instance;
                },
                addSettings : function(customSettings) {
                  try {
                    var keys = Object.keys(customSettings);
                    for (var i = 0; i < keys.length; i++) {
                      settings[keys[i]] = customSettings[keys[i]];
                    }
                  }
                  catch(error) {

                  }
                  return this.init();
                },
                addInput : function(options) {
                  Add.addInput(options);
                  return this.init();
                },
                addSelect : function(list) {
                  Add.addSelect(list);
                  return this.init();
                },
                addParent : function(id) {
                  settings.parent = id;
                  return instance;
                }
          };

    }

    //Singleton
    function init() {
      if (!instance) {
        instance = new Controls(this.dom);
      }
      return instance;
    }

    return init();

})();





function addInput(form) {

  var data = {
    name: '',
    value: "",
    class: '',
    label: document.getElementById('labelValue').value
  };

  form.addInput(data);

}

function addSelect() {

  var data = {
    name: '',
    value: '',
    class: '',
    label: ''
  };

  form.addSelect();

}
