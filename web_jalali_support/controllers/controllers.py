# -*- coding: utf-8 -*-
from odoo import http

# class WebJalaliSupport(http.Controller):
#     @http.route('/web_jalali_support/web_jalali_support/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/web_jalali_support/web_jalali_support/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('web_jalali_support.listing', {
#             'root': '/web_jalali_support/web_jalali_support',
#             'objects': http.request.env['web_jalali_support.web_jalali_support'].search([]),
#         })

#     @http.route('/web_jalali_support/web_jalali_support/objects/<model("web_jalali_support.web_jalali_support"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('web_jalali_support.object', {
#             'object': obj
#         })