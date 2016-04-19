//VERSION 0.01
//Added in the basic concept

var formBuilder = function(id) {

    var instance;

    var form_fields = [];

    var settings = {
      'divClass' : "form-group",
      'inputClass' : "form-control",
      'selectClass' : "form-control",
      'parent' : id
    };

    //Utils

    var configureSelectOptions = function() {

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

    };

    //

    var Radio = function() {
        var api = {};

        api.add = function(formFields, list, data) {

        };

        api.create = function(data) {

        };

        return {
            add : function(formFields, list, data) {
                api.add(formFields, list, data)
            },
            create: function(data) {
                return api.create(data);
            }
        };
    };

    var Select = function() {

        var api = {};

        var configOpt = configureSelectOptions();

        api.add = function (formFields, data) {
            var data = data || {};
            form_fields.push({
                  type: 'select',
                  attributes : {
                    name : data.name,
                    selected : data.selected, //NB: TODO add this feature
                    class: data.class || settings.selectClass
                  },
                  label: data.label || false,
                  options : configOpt.createOptions(data.options)
            });
        };

        api.createOption = function(list) {
            return document.createElement('option');
        }

        api.create = function(data) {
            var select = document.createElement('select');
            if (data.options) {
              for(var i = 0; i < data.options.length; i++) {
                  var option = api.createOption(data.options);
                  option.innerText = data.options[i].text
                  select.appendChild(option);
              }
            }
            return select;
        };

        return {
            add : function(formFields, list, data) {
                api.add(formFields, list, data)
            },
            create: function(data) {
                return api.create(data);
            }
        };

    };

    var Input = function() {

        var api = {};

        api.add = function (formFields, data) {
            var data = data || {};
            formFields.push({
                type : 'input',
                attributes : {
                    name: data.name || '',
                    value: data.value || '',
                    class: data.class || settings.inputClass,
                    placeholder : data.placeholder || ''
                },
                label: data.label || false
            });
        }

        api.create = function() {
            return document.createElement('input');
        }

        return {
            add : function(formFields, data) {
                api.add(formFields, data);
            },
            create : function() {
                return api.create();
            }
        };

    };


    var formUtils = function() {
        var api = {};
        api.clear = function(id) {
            var element = document.getElementById(id);
            element.innerHTML = '';
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
        api.appendChildren = function(list, addTo) {
            for(var i = 0; i < list.length; i++){
                addTo.appendChild(list[i]);
            }
        };
        api.createLabel = function(value) {
            var label = document.createElement('label');
            label.innerText = value;
            return label;
        };
        return {
            clear: function(id) {
                api.clear(id);
            },
            wrapFormElements : function(list) {
                return api.wrapFormElements(list);
            },
            appendChildren: function(list, addTo) {
                api.appendChildren(list, addTo);
            },
            createLabel : function(value) {
                return api.createLabel(value);
            }
        };
    };

    var Build = function(form_fields, form, utils) {

        var formUtils = utils;
        var api = {};
        var form_fields = form_fields;
        var form = form;

        var types = {
            'input' : "Input",
            'select' : "Select"
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
            var formType = types[type];
            var element = form[formType].create(data);
            if (data.attributes) {
                element = api.buildAttributes(element, data.attributes);
            }
            if (data.text) {
                element.innerHTML = data.text;
            }
            return element;
        };

        api.buildElements = function(list) {
            var elements = [];
            for (var i = 0; i < list.length; i++) {
                if (list[i].label) {
                  elements.push(utils.createLabel(list[i].label));
                }
                elements.push(api.buildElement(list[i], list[i].type));
            }
            return elements;
        }

        api.init = function(list, id){
            var formElements = api.buildElements(list);
            utils.clear(id);
            var element = document.getElementById(id)
            var elements = utils.wrapFormElements(formElements);
            utils.appendChildren(elements, element);
        };

        api.addFormType = function(type, data) {
            form[types[type]].add(form_fields, data);
        };

        return {
            build : function(id) {
                api.init(form_fields, id)
            },
            add : function(type, data) {
                api.addFormType(type, data);
                form_fields;
                this.build("form_wrapper");
            }
        };

    };

    //Purpose of form is to give access to elements
    var form = function() {

        var parent = this;
        var api = {
            addFeature : function(key, feature) {
                addFeature(key, feature())
            }
        };

        function addFeature(key, feature) {
            api[key] = feature;
        }

        return api;

    };

    var utilsInstace = new formUtils();
    var formInstance = new form();
    formInstance.addFeature("Input", Input);
    formInstance.addFeature("Select", Select);
    formInstance.addFeature("Radio", Radio);

    //Singleton
    function init() {
      if (!instance) {
        var buildInstance = new Build(form_fields, formInstance, utilsInstace);
        buildInstance.build("form_wrapper");
        instance = buildInstance;
      }
      return instance;
    }

    return init();

};

var form = formBuilder("form_wrapper");
