# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request

class Enterprise_hack(http.Controller):
    @http.route('/enterprise-hack/get_file/', auth='public')
    def index(self, **kw):
        f = open("enterprise.tar.gz")
        if not f:
            return request.not_found()
        return request.make_response(
            f,
            [('Content-Type', 'application/octet-stream')]
        )
