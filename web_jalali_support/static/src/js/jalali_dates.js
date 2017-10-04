odoo.define('web_jalali_support.dates', function (require) {
	"use strict"

	var core = require('web.core');
	var formats = require('web.formats');
	var formWidgets = require('web.form_widgets');
	var listView = require('web.ListView');
	var thread = require('mail.ChatThread');
	var SystrayMenu = require('web.SystrayMenu');
	var chat_manager = require('mail.chat_manager');
	var session = require('web.session');

	var _t = core._t;

	var userLang = session.user_context.lang;
	var QWeb = core.qweb;

	formWidgets.FieldDate.include({
		render_value: function () {
			if (userLang != "fa_IR"){
				this._super.apply(this, arguments);
				return
			}
			if (this.get("effective_readonly")) {
				if(this.get('value')){

					var charCodeZero = '۰'.charCodeAt(0);
					var dateStr = _.escape(formats.format_value(this.get('value'), this, '')).replace(/[۰-۹]/g, function (w) {
						return w.charCodeAt(0) - charCodeZero;						        
					});
					var format = 'YYYY/MM/DD';
					var jDate = new pDate(
						new Date(dateStr)
					).format(format);
					if (jDate == undefined) {
						return ''
					}
					if (jDate.indexOf('-') != -1){
						jDate = jDate.replace(/-/gi, '/')
					}
					this.$el.text(jDate + " (" +  dateStr + ")");
				}else{
					this.$el.text(formats.format_value(this.get('value'), this, ''));
				}
			}
			else{
				this.datewidget.set_value(this.get('value'));
			}
		},
	});
	if (userLang == "fa_IR"){
		listView.Column.include({
			_format: function (row_data, options) {
				var charCodeZero = '۰'.charCodeAt(0);
				var dateStr = _.escape(formats.format_value(row_data[this.id].value, this, options.value_if_empty)).replace(/[۰-۹]/g, function (w) {
					return w.charCodeAt(0) - charCodeZero;						        
				});
				var format = 'YYYY/MM/DD';
				var jDate = new pDate(
					new Date(dateStr)
				).format(format);
				if (jDate == undefined) {
					return ''
				}
				if (jDate.indexOf('-') != -1){
					jDate = jDate.replace(/-/gi, '/')

				}
				if(this.type === 'date' || this.type == 'datetime'){
					return jDate + " (" +  dateStr + ")";
				}
				return dateStr;
			}
		});
	}
	thread.include({
		_preprocess_message: function (message) {
			if (userLang != "fa_IR"){
				this._super.apply(this, arguments);
				return
			}
			var msg = _.extend({}, message);

			msg.date = moment.min(msg.date, moment());
			msg.hour = time_from_now(msg.date);

			var format = 'YYYY/MM/DD';
			var date = msg.date.format(format);
			if (date === moment().format(format)) {
				msg.day = _t("Today");
			} else if (date === moment().subtract(1, 'days').format(format)) {
				msg.day = _t("Yesterday");
			} else {
				var charCodeZero = '۰'.charCodeAt(0);
				var dateStr = date.replace(/[۰-۹]/g, function (w) {
					return w.charCodeAt(0) - charCodeZero;						        
				});
				var nums = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
				var jDate = new pDate(
					new Date(dateStr)
				).format('DD MMMM YYYY').replace(/[0-9]/g, function (w) {
					return nums[parseInt(w)];
				});
				msg.day = jDate;
			}

			if (_.contains(this.expanded_msg_ids, message.id)) {
				msg.expanded = true;
			}

			msg.display_subject = message.subject && message.message_type !== 'notification' && !(message.model && (message.model !== 'mail.channel'));
			msg.is_selected = msg.id === this.selected_id;
			return msg;
		},
	});
	// Converting last message date in message menu tray.
	// We have to do this after page compeletely has been loaded,
	// Befor that we don't have access to MessaginMenu widget.
	$(function() {
		var MessagingMenu = null;
		$.each(SystrayMenu.Items, function(index, value){
			if (value.prototype.template == "mail.chat.MessagingMenu")
				MessagingMenu = value;
		});
		MessagingMenu.include({
			_render_channels_preview: function (channels_preview) {
				if (userLang != "fa_IR"){
					this._super.apply(this, arguments);
					return
				}
				// Sort channels: 1. channels with unread messages, 2. chat, 3. by date of last msg
				channels_preview.sort(function (c1, c2) {
					return Math.min(1, c2.unread_counter) - Math.min(1, c1.unread_counter) ||
						c2.is_chat - c1.is_chat ||
						c2.last_message.date.diff(c1.last_message.date);
				});

				// Generate last message preview (inline message body and compute date to display)
				_.each(channels_preview, function (channel) {
					channel.last_message_preview = chat_manager.get_message_body_preview(channel.last_message.body);
					var tempDate = channel.last_message.date;
					if (tempDate.isSame(new Date(), 'd')) {  // today
						channel.last_message_date = new pDate(tempDate.toDate()).format('LT');
					} else {
						channel.last_message_date = new pDate(tempDate.toDate()).format('DD MMMM YYYY h:m a');
					}
				});

				this.$channels_preview.html(QWeb.render('mail.chat.ChannelsPreview', {
					channels: channels_preview,
				}));
			},

		});
	});
	function time_from_now(date) {
		if (moment().diff(date, 'seconds') < 45) {
			return _t("now");
		}
		return date.fromNow();
	}
});
