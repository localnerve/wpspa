webshims.register('form-message', function($, webshims, window, document, undefined, options){
	"use strict";
	if(options.overrideMessages){
		options.customMessages = true;
		webshims.error('overrideMessages is deprecated. use customMessages instead.');
	}
	var validityMessages = webshims.validityMessages;
	
	var implementProperties = options.customMessages ? ['customValidationMessage'] : [];
	
	validityMessages.en = $.extend(true, {
		typeMismatch: {
			defaultMessage: 'Please enter a valid value.',
			email: 'Please enter an email address.',
			url: 'Please enter a URL.',
			number: 'Please enter a number.',
			date: 'Please enter a date.',
			time: 'Please enter a time.',
			range: 'Invalid input.',
			month: 'Please enter a valid value.',
			"datetime-local": 'Please enter a datetime.'
		},
		rangeUnderflow: {
			defaultMessage: 'Value must be greater than or equal to {%min}.'
		},
		rangeOverflow: {
			defaultMessage: 'Value must be less than or equal to {%max}.'
		},
		stepMismatch: 'Invalid input.',
		tooLong: 'Please enter at most {%maxlength} character(s). You entered {%valueLen}.',
		patternMismatch: 'Invalid input. {%title}',
		valueMissing: {
			defaultMessage: 'Please fill out this field.',
			checkbox: 'Please check this box if you want to proceed.'
		}
	}, (validityMessages.en || validityMessages['en-US'] || {}));
	
	if(typeof validityMessages['en'].valueMissing == 'object'){
		['select', 'radio'].forEach(function(type){
			validityMessages.en.valueMissing[type] = validityMessages.en.valueMissing[type] || 'Please select an option.';
		});
	}
	if(typeof validityMessages.en.rangeUnderflow == 'object'){
		['date', 'time', 'datetime-local', 'month'].forEach(function(type){
			validityMessages.en.rangeUnderflow[type] = validityMessages.en.rangeUnderflow[type] || 'Value must be at or after {%min}.';
		});
	}
	if(typeof validityMessages.en.rangeOverflow == 'object'){
		['date', 'time', 'datetime-local', 'month'].forEach(function(type){
			validityMessages.en.rangeOverflow[type] = validityMessages.en.rangeOverflow[type] || 'Value must be at or before {%max}.';
		});
	}
	if(!validityMessages['en-US']){
		validityMessages['en-US'] = $.extend(true, {}, validityMessages.en);
	}
	if(!validityMessages['en-GB']){
		validityMessages['en-GB'] = $.extend(true, {}, validityMessages.en);
	}
	if(!validityMessages['en-AU']){
		validityMessages['en-AU'] = $.extend(true, {}, validityMessages.en);
	}
	validityMessages[''] = validityMessages[''] || validityMessages['en-US'];
	
	validityMessages.de = $.extend(true, {
		typeMismatch: {
			defaultMessage: '{%value} ist in diesem Feld nicht zulässig.',
			email: '{%value} ist keine gültige E-Mail-Adresse.',
			url: '{%value} ist kein(e) gültige(r) Webadresse/Pfad.',
			number: '{%value} ist keine Nummer.',
			date: '{%value} ist kein Datum.',
			time: '{%value} ist keine Uhrzeit.',
			month: '{%value} ist in diesem Feld nicht zulässig.',
			range: '{%value} ist keine Nummer.',
			"datetime-local": '{%value} ist kein Datum-Uhrzeit Format.'
		},
		rangeUnderflow: {
			defaultMessage: '{%value} ist zu niedrig. {%min} ist der unterste Wert, den Sie benutzen können.'
		},
		rangeOverflow: {
			defaultMessage: '{%value} ist zu hoch. {%max} ist der oberste Wert, den Sie benutzen können.'
		},
		stepMismatch: 'Der Wert {%value} ist in diesem Feld nicht zulässig. Hier sind nur bestimmte Werte zulässig. {%title}',
		tooLong: 'Der eingegebene Text ist zu lang! Sie haben {%valueLen} Zeichen eingegeben, dabei sind {%maxlength} das Maximum.',
		patternMismatch: '{%value} hat für dieses Eingabefeld ein falsches Format. {%title}',
		valueMissing: {
			defaultMessage: 'Bitte geben Sie einen Wert ein.',
			checkbox: 'Bitte aktivieren Sie das Kästchen.'
		}
	}, (validityMessages.de || {}));
	
	if(typeof validityMessages.de.valueMissing == 'object'){
		['select', 'radio'].forEach(function(type){
			validityMessages.de.valueMissing[type] = validityMessages.de.valueMissing[type] || 'Bitte wählen Sie eine Option aus.';
		});
	}
	if(typeof validityMessages.de.rangeUnderflow == 'object'){
		['date', 'time', 'datetime-local', 'month'].forEach(function(type){
			validityMessages.de.rangeUnderflow[type] = validityMessages.de.rangeUnderflow[type] || '{%value} ist zu früh. {%min} ist die früheste Zeit, die Sie benutzen können.';
		});
	}
	if(typeof validityMessages.de.rangeOverflow == 'object'){
		['date', 'time', 'datetime-local', 'month'].forEach(function(type){
			validityMessages.de.rangeOverflow[type] = validityMessages.de.rangeOverflow[type] || '{%value} ist zu spät. {%max} ist die späteste Zeit, die Sie benutzen können.';
		});
	}
	
	var currentValidationMessage =  validityMessages[''];
	var getMessageFromObj = function(message, elem){
		if(message && typeof message !== 'string'){
			message = message[ $.prop(elem, 'type') ] || message[ (elem.nodeName || '').toLowerCase() ] || message[ 'defaultMessage' ];
		}
		return message || '';
	};
	var valueVals = {
		value: 1,
		min: 1,
		max: 1
	};
	
	webshims.createValidationMessage = function(elem, name){
		var widget;
		var message = getMessageFromObj(currentValidationMessage[name], elem);
		var type = $.prop(elem, 'type');
		if(!message){
			message = getMessageFromObj(validityMessages[''][name], elem) || $.prop(elem, 'validationMessage');
			webshims.info('could not find errormessage for: '+ name +' / '+ type +'. in language: '+$.webshims.activeLang());
		}
		if(message){
			['value', 'min', 'max', 'title', 'maxlength', 'label'].forEach(function(attr){
				if(message.indexOf('{%'+attr) === -1){return;}
				var val = ((attr == 'label') ? $.trim($('label[for="'+ elem.id +'"]', elem.form).text()).replace(/\*$|:$/, '') : $.prop(elem, attr)) || '';
				if(name == 'patternMismatch' && attr == 'title' && !val){
					webshims.error('no title for patternMismatch provided. Always add a title attribute.');
				}
				if(valueVals[attr]){
					if(!widget){
						widget = $(elem).getShadowElement().data('wsWidget'+type);
					}
					if(widget && widget.formatValue){
						val = widget.formatValue(val, false);
					}
				}
				message = message.replace('{%'+ attr +'}', val);
				if('value' == attr){
					message = message.replace('{%valueLen}', val.length);
				}
				
			});
		}
		
		return message || '';
	};
	
	
	if(!Modernizr.formvalidation || webshims.bugs.bustedValidity){
		implementProperties.push('validationMessage');
	}
	
	webshims.activeLang({
		langObj: validityMessages, 
		module: 'form-core',
		callback: function(langObj){
			currentValidationMessage = langObj;
		}
	});
	webshims.activeLang({
		register: 'form-core',
		callback: function(val){
			$.each(validityMessages, function(i, val){
				if(validityMessages[val]){
					currentValidationMessage = validityMessages[val];
					return false;
				}
			});
		}
	});
	
	implementProperties.forEach(function(messageProp){
		var skipNames = {
			valid: 1,
			badInput: 1
		};
		webshims.defineNodeNamesProperty(['fieldset', 'output', 'button'], messageProp, {
			prop: {
				value: '',
				writeable: false
			}
		});
		['input', 'select', 'textarea'].forEach(function(nodeName){
			var desc = webshims.defineNodeNameProperty(nodeName, messageProp, {
				prop: {
					get: function(){
						var elem = this;
						var message = '';
						if(!$.prop(elem, 'willValidate')){
							return message;
						}
						
						var validity = $.prop(elem, 'validity') || {valid: 1};
						
						if(validity.valid){return message;}
						message = webshims.getContentValidationMessage(elem, validity);
						
						if(message){return message;}
						
						if(validity.customError && elem.nodeName){
							message = (Modernizr.formvalidation && !webshims.bugs.bustedValidity && desc.prop._supget) ? desc.prop._supget.call(elem) : webshims.data(elem, 'customvalidationMessage');
							if(message){return message;}
						}
						$.each(validity, function(name, prop){
							if(skipNames[name] || !prop){return;}
							
							message = webshims.createValidationMessage(elem, name);
							if(message){
								return false;
							}
						});
						if(!message && validity.badInput){
							message = webshims.createValidationMessage(elem, 'typeMismatch') || webshims.createValidationMessage(elem, 'valueMissing');
						}
						return message || '';
					},
					writeable: false
				}
			});
		});
		
	});
});
