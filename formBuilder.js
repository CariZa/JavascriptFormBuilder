//VERSION 0.01
//Added in the basic concept

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

 for ( var i = 0; i < form_fields.length; i++) {

     var field = form_fields[i];
     console.log(field.type);
     if (valid_types.indexOf(field.type) < 0) continue;


     //var type = form_builder[field.type];
     var container = document.getElementById('form_wrapper');

     var element = document.createElement(field.type);

     for (var j = 0; j < Object.keys(field.attributes).length; j++) {
         var attribute = Object.keys(field.attributes)[j];
         var value = field.attributes[attribute];
         element.setAttribute(attribute, value);
     }
     container.appendChild(element);
 }

    
