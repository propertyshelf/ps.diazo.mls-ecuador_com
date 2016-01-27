# -*- coding: utf-8 -*-
"""Test Layer for ps.diazo.mls_ecuador_com."""

# zope imports
from plone.app.robotframework.testing import REMOTE_LIBRARY_BUNDLE_FIXTURE
from plone.app.testing import (
    FunctionalTesting,
    IntegrationTesting,
    PloneSandboxLayer,
    PLONE_FIXTURE,
    applyProfile,
)
from plone.testing import (
    Layer,
    z2,
)
from zope.configuration import xmlconfig


class PsDiazoMlsEcuadorComLayer(PloneSandboxLayer):
    """Custom Test Layer for ps.diazo.mls_ecuador_com."""
    defaultBases = (PLONE_FIXTURE, )

    def setUpZope(self, app, configurationContext):
        """Set up Zope for testing."""
        # Load ZCML
        import ps.diazo.mls_ecuador_com
        xmlconfig.file(
            'configure.zcml',
            ps.diazo.mls_ecuador_com,
            context=configurationContext
        )

    def setUpPloneSite(self, portal):
        applyProfile(portal, 'ps.diazo.mls_ecuador_com:default')


PS_DIAZO_MLS_ECUADOR_COM_FIXTURE = PsDiazoMlsEcuadorComLayer()


PS_DIAZO_MLS_ECUADOR_COM_INTEGRATION_TESTING = IntegrationTesting(
    bases=(PS_DIAZO_MLS_ECUADOR_COM_FIXTURE,),
    name='PsDiazoMlsEcuadorComLayer:IntegrationTesting'
)


PS_DIAZO_MLS_ECUADOR_COM_FUNCTIONAL_TESTING = FunctionalTesting(
    bases=(PS_DIAZO_MLS_ECUADOR_COM_FIXTURE,),
    name='PsDiazoMlsEcuadorComLayer:FunctionalTesting'
)


PS_DIAZO_MLS_ECUADOR_COM_ACCEPTANCE_TESTING = FunctionalTesting(
    bases=(
        PS_DIAZO_MLS_ECUADOR_COM_FIXTURE,
        REMOTE_LIBRARY_BUNDLE_FIXTURE,
        z2.ZSERVER_FIXTURE
    ),
    name='PsDiazoMlsEcuadorComLayer:AcceptanceTesting'
)


ROBOT_TESTING = Layer(name='ps.diazo.mls_ecuador_com:Robot')
