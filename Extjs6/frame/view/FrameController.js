Ext.define('oa.view.FrameController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    listen: {
        controller: {
            '#': {
                unmatchedroute: 'onRouteChange'
            }
        }
    },

    routes: {
        ':node': 'onRouteChange'
    },

    lastView: null,

    setCurrentView: function (hashTag) {
        //debugger;
        hashTag = (hashTag || '').toLowerCase();        
        var me = this,
            refs = me.getReferences(),
            mainCard = refs.mainCardPanel,
            mainLayout = mainCard.getLayout(),
            navigationList = refs.navigationTreeList,
            store = navigationList.getStore(),
            node = store.findNode('routeId', hashTag) ||
                   store.findNode('viewType', hashTag),
            view = (node && node.get('viewType')) || 'page404',
            lastView = me.lastView,
            existingItem = mainCard.child('component[routeId=' + hashTag + ']'),
            newView;

        if (!node) return;//???? 

        if (lastView && lastView.isWindow) {
            lastView.destroy();
        }

        lastView = mainLayout.getActiveItem();

        if (!existingItem) {

            Ext.require(node.data.requires || ['oa.view.AppFrame'], function () {
                //debugger;
                newView = Ext.create({
                    xtype: view,
                    routeId: hashTag,
                    hideMode: 'offsets'
                    //closable:true
                });

                if (!newView || !newView.isWindow) {

                    if (existingItem) {

                        if (existingItem !== lastView) {
                            mainLayout.setActiveItem(existingItem);
                        }
                        newView = existingItem;
                    }
                    else {
                        Ext.suspendLayouts();
                        mainLayout.setActiveItem(mainCard.add(newView));
                        Ext.resumeLayouts(true);
                    }
                }

                navigationList.setSelection(node);

                if (newView.isFocusable(true)) {
                    newView.focus();
                }
                me.lastView = newView;
            });
        }
        else {

            if (!newView || !newView.isWindow) {

                if (existingItem) {

                    if (existingItem !== lastView) {
                        mainLayout.setActiveItem(existingItem);
                    }
                    newView = existingItem;
                }
                else {

                    Ext.suspendLayouts();
                    mainLayout.setActiveItem(mainCard.add(newView));
                    Ext.resumeLayouts(true);
                }
            }

            navigationList.setSelection(node);

            if (newView.isFocusable(true)) {
                newView.focus();
            }

            me.lastView = newView;
        }

    },

    onMainViewRender: function () {
        //debugger;

        if (!window.location.hash) {
            this.redirectTo(siteConfig.modules[siteConfig.defaultModule].defaultToken);
        }
    },

    onNavigationTreeSelectionChange: function (tree, node) {
        //debugger;
        var to = node && (node.get('routeId') || node.get('viewType'));
        if (to) {
            this.redirectTo(to);
        }
    },

    onToggleNavigationSize: function () {
        var me = this,
            refs = me.getReferences(),
            navigationList = refs.navigationTreeList,
            wrapContainer = refs.mainContainerWrap,
            collapsing = !navigationList.getMicro(),
            new_width = collapsing ? 64 : 250;
        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();

            refs.senchaLogo.setWidth(new_width);

            navigationList.setWidth(new_width);
            navigationList.setMicro(collapsing);

            Ext.resumeLayouts();

            wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
            wrapContainer.updateLayout();
        }
        else {
            if (!collapsing) {
                navigationList.setMicro(false);
            }

            refs.senchaLogo.animate({ dynamic: true, to: { width: new_width } });

            navigationList.width = new_width;
            wrapContainer.updateLayout({ isRoot: true });
            navigationList.el.addCls('nav-tree-animating');

            if (collapsing) {
                navigationList.on({
                    afterlayoutanimation: function () {
                        navigationList.setMicro(true);
                        navigationList.el.removeCls('nav-tree-animating');
                    },
                    single: true
                });
            }
        }
    },

    onRouteChange: function (id) {
      
        var _module = id.split(".")[0];
        var me = this;
        var naviTree = Ext.getCmp("navigationTreeList");

        var menuStore = naviTree.getStore();
        menuStore.onLoadMenu = function (r, options, success) {
            me.setCurrentView(id);
        };
        if (_module != menuStore.storeId) {
            menuStore.removeAll();
            menuStore.storeId = _module;
            menuStore.getProxy().url = '/frame/menu/' + _module + '.json';
            menuStore.load();
        } else {
            me.setCurrentView(id);
        }
    },

    onModuleChange: function (obj) {

        //debugger;      
        var defaultToken = siteConfig.modules[obj.moduleName].defaultToken;
        this.redirectTo(defaultToken);
    }
});
