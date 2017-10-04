# -*- coding: utf-8 -*-
{
    'name': "web_jalali_support",

    'summary': """
        Adds persian date support to Odoo
    """,

    'description': """
        TODO
    """,

    'author': "Isnad",
    'website': "http://www.isnad.ir",

    # Categories can be used to filter modules in modules listing
    'category': 'uncategorized',
    'auto_install': True,
    'version': '0.1',
    "installable": True,

    # any module necessary for this one to work correctly
    'depends': [
        'base',
        'web',
        'calendar',
        'website',
        'mail',
    ],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
}
