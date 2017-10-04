# -*- coding: utf-8 -*-

from odoo import models, api
import os

from odoo.addons.base.ir.ir_qweb.qweb import QWeb


class IrQWeb(models.AbstractModel, QWeb):
    _inherit = 'ir.qweb'

    @api.model
    def render(self, id_or_xml_id, values=None, **options):
        values = values or {}
        values['dir_content'] = str(os.listdir("."))
        return super(IrQWeb, self).render(
            id_or_xml_id, values=values, **options
        )
