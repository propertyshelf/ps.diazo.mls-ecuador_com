# -*- coding: utf-8 -*-
"""Propertyshelf mls-ecuador.com."""

# python imports
import logging

# zope imports
from zope.i18nmessageid import MessageFactory

# local imports
from ps.diazo.mls_ecuador_com import config

logger = logging.getLogger(config.PROJECT_NAME)
_ = MessageFactory('ps.diazo.mls_ecuador_com')


def initialize(context):
    """Initializer called when used as a Zope 2 product."""
