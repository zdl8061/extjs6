Ext.define("oa.view.Frame", {
    extend: 'Ext.container.Viewport',
    xtype: 'oa-frame',
    requires: ["oa.view.FrameWrap", "oa.view.FrameController", "oa.proxy.API", "oa.component.TxGrid"],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    controller: 'main',

    listeners: {
        render: 'onMainViewRender'
    },

    items: [{
        xtype: 'toolbar',
        cls: 'sencha-dash-dash-headerbar shadow',
        height: 64,
        itemId: 'headerBar',
        items: [
            {
                xtype: 'component',
                reference: 'senchaLogo',
                cls: 'sencha-logo',
                html: '<div class="main-logo"><img src="resources/images/company-logo.png">App</div>',
                width: 250
            },
            {
                margin: '0 0 0 8',
                ui: 'header',
                iconCls: 'x-fa fa-navicon',
                id: 'main-navigation-btn',
                handler: 'onToggleNavigationSize'
            },
            '->',
            {
                //xtype: 'component',
                text: 'CRM',
                moduleName: 'crm',
                width: 100,
                handler: 'onModuleChange'
            },
            {
                //xtype: 'component',
                text: 'SAAS',
                moduleName: 'saas',
                width: 100,
                handler: 'onModuleChange'
            }
        ]
    },
        {
            xtype: 'maincontainerwrap',
            id: 'main-view-detail-wrap',
            reference: 'mainContainerWrap',
            flex: 1,
            items: [
                {
                    xtype: 'treelist',
                    reference: 'navigationTreeList',
                    itemId: 'navigationTreeList',
                    id: "navigationTreeList",
                    ui: 'navigation',
                    width: 250,
                    expanderFirst: false,
                    expanderOnly: false,
                    listeners: {
                        selectionchange: 'onNavigationTreeSelectionChange'
                    },
                    store: Ext.create('Ext.data.TreeStore', {
                        autoLoad: false,
                        proxy: {
                            type: 'ajax',
                            reader: {
                                type: 'json',
                                rootProperty: 'children'
                                //record: 'node' 
                            }
                        },
                        onLoadMenu: function () { },
                        listeners: {
                            load: 'onLoadMenu'
                        }
                    })
                },
                {
                    xtype: 'container',
                    flex: 1,
                    reference: 'mainCardPanel',
                    cls: 'sencha-dash-right-main-container',
                    itemId: 'contentPanel',
                    layout: {
                        type: 'card',
                        anchor: '100%'
                    }
                }
            ]
        }]
});