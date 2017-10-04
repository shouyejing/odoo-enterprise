odoo.define('web_jalali_support.datepicker', function (require) {
	"use strict";

	var core = require('web.core');
	var dp = require('web.datepicker');
	var formats = require('web.formats');
	var Widget = require('web.Widget');
	var session = require('web.session');

	var _t = core._t;

	var userLang = session.user_context.lang;

	dp.DateWidget.include({
		init: function(parent, options) {
			console.log(userLang);
			if (userLang != "fa_IR"){
        this._super.apply(this, arguments);
        return
			}
			Widget.prototype.init.apply(this, arguments);
			this.name = parent.name;
			var dateFormat = (this.type_of_date === 'datetime')? ('YYYY/MM/DD hh:mm') : 'YYYY/MM/DD';
			this.options = _.defaults(options || {}, {
				persianNumbers: true,
				showGregorianDate: false,
				//selectedDate : new persianDate().now().toString(dateFormat),
				theme : 'default',
				formatDate : dateFormat,
				onSelect: function () {
					$('.o_datepicker_input').trigger('dp.change');
				}, 
				onShow : function() {
					$('.o_datepicker_input').trigger('dp.show')
				},
			});
		},
		start: function() {
			if (userLang != "fa_IR"){
        this._super.apply(this, arguments);
        return
			}
			this.$input = this.$('input.o_datepicker_input');
			this.$input.persianDatepicker(this.options);
			this.set_readonly(false);
		},
		set_value: function(value) {
			if (userLang != "fa_IR"){
        this._super.apply(this, arguments);
        return
			}
			if (value){
				this.set({'value': value});
				this.$input.data('gdate', value);
				this.$input.attr('data-gdate', value);
				var jdf = new jDateFunctions();
				var dateFormat = (this.type_of_date === 'datetime')? ('YYYY/MM/DD hh:mm') : 'YYYY/MM/DD';
				var persianDate = jdf.getPCalendarDate(jdf.getJulianDay(new Date(value), 0)).toString(dateFormat);
				this.$input.data('jdate', persianDate);
				this.$input.attr('data-jdate', persianDate);
				this.$input.val(persianDate);
			}
		},
		get_value: function() {
			if (userLang != "fa_IR"){
        this._super.apply(this, arguments);
        return
			}
			return this.$input.attr('data-gdate');
		},
		set_value_from_ui: function() {
			if (userLang != "fa_IR"){
        this._super.apply(this, arguments);
        return
			}
			var value = this.$input.attr('data-gdate') || false;
			this.set_value(this.parse_client(value));
		},
		destroy: function() {
			if (userLang != "fa_IR"){
        this._super.apply(this, arguments);
        return
			}
			Widget.prototype.init.apply(this, arguments);
			return
		},
		is_valid: function() {
			if (userLang != "fa_IR"){
        this._super.apply(this, arguments);
        return
			}
			var value = this.$input.attr('data-gdate');
			if(value === "") {
				return true;
			} else {
				try {
					this.parse_client(value);
					return true;
				} catch(e) {
					return false;
				}
			}
		},
		parse_client: function(v) {
			if (userLang != "fa_IR"){
        this._super.apply(this, arguments);
        return
			}
			return formats.parse_value(v, {"widget": this.type_of_date});
		},
		format_client: function(v) {
			if (userLang != "fa_IR"){
        this._super.apply(this, arguments);
        return
			}
			return formats.format_value(v, {"widget": this.type_of_date});
		},
		set_datetime_default: function() {
			if (userLang != "fa_IR"){
        this._super.apply(this, arguments);
        return
			}
			//when opening datetimepicker the date and time by default should be the one from
			//the input field if any or the current day otherwise
			var value = moment().second(0);
			if(this.is_valid()) {
				value = this.$input.attr('data-gdate');
			}
			this.set_value(value);
		},
	});
});
