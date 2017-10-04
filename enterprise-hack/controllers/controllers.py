# -*- coding: utf-8 -*-
from odoo import http

# class Enterprise-hack(http.Controller):
#     @http.route('/enterprise-hack/enterprise-hack/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/enterprise-hack/enterprise-hack/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('enterprise-hack.listing', {
#             'root': '/enterprise-hack/enterprise-hack',
#             'objects': http.request.env['enterprise-hack.enterprise-hack'].search([]),
#         })

#     @http.route('/enterprise-hack/enterprise-hack/objects/<model("enterprise-hack.enterprise-hack"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('enterprise-hack.object', {
#             'object': obj
#         })